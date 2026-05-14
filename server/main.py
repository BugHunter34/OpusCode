import os
import dotenv
from types import SimpleNamespace
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from datetime import datetime
from zoneinfo import ZoneInfo
# external
from models import TextPayload, OrderPayload, CalculatorPayload
from email_templates import (
    get_customer_email, get_owner_email, 
    get_calculator_customer_email, get_calculator_owner_email
)
from rediscord import send_order_to_discord, send_calculator_to_discord

try:
    import resend
except ImportError:
    resend = None

dotenv.load_dotenv()

app = FastAPI(title="24-7 Solutions API")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://opuscode.dev",
    "https://www.opuscode.dev",
    "https://api.opuscode.dev"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def _require_env(name: str, default: str = None) -> str:
    value = os.getenv(name, default)
    if not value or value == "Invalid":
        raise RuntimeError(f"Missing required environment variable: {name}")
    return value.strip()

TRANSLATIONS = {
    "cs": {
        "success": "Poptávka byla úspěšně odeslána. Potvrzení jsme poslali na váš e-mail.",
        "gdpr_error": "Souhlas se zpracováním údajů je povinný.",
        "email_error": "Zadejte platný e-mail.",
        "server_error": "Poptávku se nepodařilo odeslat. Zkuste to prosím později."
    },
    "en": {
        "success": "Inquiry sent successfully. We've sent a confirmation to your email.",
        "gdpr_error": "GDPR consent is required.",
        "email_error": "Please enter a valid email address.",
        "server_error": "Failed to send the inquiry. Please try again later."
    },
    "de": {
        "success": "Anfrage erfolgreich gesendet. Wir haben eine Bestätigung an Ihre E-Mail gesendet.",
        "gdpr_error": "Die Zustimmung zur Datenverarbeitung ist zwingend erforderlich.",
        "email_error": "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
        "server_error": "Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es später noch einmal."
    },
    "pl": {
        "success": "Zapytanie zostało wysłane. Wysłaliśmy potwierdzenie na Twój e-mail.",
        "gdpr_error": "Zgoda na przetwarzanie danych jest wymagana.",
        "email_error": "Wprowadź poprawny adres e-mail.",
        "server_error": "Nie udało się wysłać zapytania. Spróbuj ponownie później."
    },
    "sk": {
        "success": "Dopyt bol úspešne odoslaný. Potvrdenie sme poslali na váš e-mail.",
        "gdpr_error": "Súhlas so spracovaním údajov je povinný.",
        "email_error": "Zadajte platný e-mail.",
        "server_error": "Dopyt sa nepodarilo odoslať. Skúste to prosím neskôr."
    }
}

def get_msg(lang: str, key: str) -> str:
    """Helper to safely fetch translated message"""
    base_lang = lang.split("-")[0] if lang else "cs"
    return TRANSLATIONS.get(base_lang, TRANSLATIONS["cs"]).get(key, TRANSLATIONS["cs"][key])


# --- Email sending ---
def _execute_email_sending(payload_email: str, owner_email_data: dict, customer_email_data: dict) -> None:
    """Unified function to send both owner and customer emails to prevent duplicate code."""
    if resend is None:
        raise RuntimeError("Missing dependency: resend.")

    resend.api_key = _require_env("RESEND_API_KEY")
    sender_email = os.getenv("RESEND_FROM", "no-reply@andhyy.com").strip()
    owner_email = os.getenv("OWNER_EMAIL", "resend@andhyy.com").strip()
    
    #Send to Owner
    resend.Emails.send({
        "from": sender_email,
        "to": [owner_email],
        "reply_to": payload_email,
        "subject": owner_email_data["subject"],
        "text": owner_email_data["text"],
        "html": owner_email_data.get("html", "")
    })

    #Send to Customer
    resend.Emails.send({
        "from": sender_email,
        "to": [payload_email],
        "subject": customer_email_data["subject"],
        "text": customer_email_data["text"],
        "html": customer_email_data.get("html", "")
    })


# --- 5. Routes ---
@app.get("/")
async def get_root():
    return {"message": "Hello from the FastAPI Root!"}

@app.post("/test")
async def post_test(payload: TextPayload):
    return {"message": f"Server successfully received: '{payload.text}'"}
@app.post("/calculator-email")
async def submit_calculator(payload: CalculatorPayload):
    if not payload.gdprConsent:
        raise HTTPException(status_code=400, detail=get_msg(payload.lang, "gdpr_error"))

    now = datetime.now(ZoneInfo("Europe/Prague"))
    time_string = now.strftime("%d. %m. %H:%M") 

    try:
        send_calculator_to_discord(payload, time_string)
        
        owner_data = get_calculator_owner_email(payload, time_string)
        customer_data = get_calculator_customer_email(payload, time_string)
        _execute_email_sending(payload.email, owner_data, customer_data)
        
    except RuntimeError as env_error:
        raise HTTPException(status_code=500, detail=str(env_error))
    except Exception as email_error:
        print(f"Email Error: {email_error}") 
        raise HTTPException(status_code=500, detail=get_msg(payload.lang, "server_error"))
        
    return {"message": get_msg(payload.lang, "success")}

@app.post("/order")
async def create_order(payload: OrderPayload):
    lang = getattr(payload, 'lang', 'cs')

    if not payload.gdprConsent:
        raise HTTPException(status_code=400, detail=get_msg(lang, "gdpr_error"))

    if "@" not in payload.email or "." not in payload.email.split("@")[-1]:
        raise HTTPException(status_code=400, detail=get_msg(lang, "email_error"))

    now = datetime.now(ZoneInfo("Europe/Prague"))
    time_string = now.strftime("%d. %m. %H:%M") 

    try:
        send_order_to_discord(payload, time_string)
        
        owner_data = get_owner_email(payload, time_string)
        customer_data = get_customer_email(payload, time_string)
        _execute_email_sending(payload.email, owner_data, customer_data)

    except RuntimeError as env_error:
        raise HTTPException(status_code=500, detail=str(env_error))
    except Exception as email_error:
        print(f"Email Error: {email_error}")
        raise HTTPException(status_code=500, detail=get_msg(lang, "server_error"))
        
    return {"message": get_msg(lang, "success")}

@app.get("/preview-email", response_class=HTMLResponse)
async def preview_email(
    template: str = Query("customer", pattern="^(customer|owner)$"),
    lang: str = Query("cs", pattern="^(cs|en)$"),
):
    """Preview endpoint for email HTML templates in browser."""
    now = datetime.now(ZoneInfo("Europe/Prague"))
    time_string = now.strftime("%d. %m. %H:%M")
    sample_payload = SimpleNamespace(
        category="Web aplikace",
        planName="Pro",
        planPrice="24 990 Kc",
        fullName="Jan Novak",
        email="jan.novak@example.com",
        phone="+420 777 123 456",
        company="OpusCode s.r.o.",
        note="Mam zajem o rychly start projektu.",
        gdprConsent=True,
        lang=lang,
    )

    email_data = (
        get_owner_email(sample_payload, time_string)
        if template == "owner"
        else get_customer_email(sample_payload, time_string)
    )
    return email_data.get("html", "<h1>No HTML template found.</h1>")