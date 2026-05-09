import os
import dotenv
from types import SimpleNamespace
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pydantic import BaseModel, EmailStr
from datetime import datetime
from email_templates import get_customer_email, get_owner_email
from models import TextPayload, OrderPayload
from rediscord import send_to_discord

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

def _send_order_emails(payload: OrderPayload) -> None:
    if resend is None:
        raise RuntimeError("Missing dependency: resend. Run 'pip install -r requirements.txt' in server folder.")

    now = datetime.now()
    time_string = now.strftime("%d. %m. %H:%M") 

    resend.api_key = _require_env("RESEND_API_KEY", "ERROR")
    sender_email = os.getenv("RESEND_FROM", "no-reply@andhyy.com").strip()
    owner_email = os.getenv("OWNER_EMAIL", "resend@andhyy.com").strip()
    
    # --- Discord ---
    send_to_discord(payload, time_string)
    # --- email to owner ---
    owner_email_data = get_owner_email(payload, time_string)
    resend.Emails.send({
        "from": sender_email,
        "to": [owner_email],
        "reply_to": payload.email,
        "subject": owner_email_data["subject"],
        "text": owner_email_data["text"],
        "html": owner_email_data.get("html", "")
    })

    # --- Email to Customer ---
    customer_email_data = get_customer_email(payload, time_string)
    resend.Emails.send({
        "from": sender_email,
        "to": [payload.email],
        "subject": customer_email_data["subject"],
        "text": customer_email_data["text"],
        "html": customer_email_data.get("html", "")
    })

# --- Routes ---
@app.get("/")
async def get_root():
    return {"message": "Hello from the FastAPI Root!"}

@app.post("/test")
async def post_test(payload: TextPayload):
    return {"message": f"Server successfully received: '{payload.text}'"}

@app.post("/order")
async def create_order(payload: OrderPayload):
    if not payload.gdprConsent:
        raise HTTPException(status_code=400, detail="Souhlas se zpracovanim udaju je povinny.")

    if "@" not in payload.email or "." not in payload.email.split("@")[-1]:
        raise HTTPException(status_code=400, detail="Zadejte platny e-mail.")

    try:
        _send_order_emails(payload)
    except RuntimeError as env_error:
        raise HTTPException(status_code=500, detail=str(env_error))
    except Exception as email_error:
        raise HTTPException(
            status_code=500,
            detail=f"Objednavku se nepodarilo odeslat e-mailem.",
        )

    return {"message": "Objednavka byla odeslana. Potvrzeni jsme poslali na vas e-mail."}

# --- Routes ---
@app.get("/")
async def get_root():
    return {"message": "Hello from the FastAPI Root!"}

@app.post("/test")
async def post_test(payload: TextPayload):
    return {"message": f"Server successfully received: '{payload.text}'"}


@app.post("/order")
async def create_order(payload: OrderPayload):
    if not payload.gdprConsent:
        raise HTTPException(status_code=400, detail="Souhlas se zpracovanim udaju je povinny.")

    if "@" not in payload.email or "." not in payload.email.split("@")[-1]:
        raise HTTPException(status_code=400, detail="Zadejte platny e-mail.")

    try:
        _send_order_emails(payload)
    except RuntimeError as env_error:
        raise HTTPException(status_code=500, detail=str(env_error))
    except Exception as email_error:
        raise HTTPException(
            status_code=500,
            detail=f"Objednavku se nepodarilo odeslat e-mailem.{str(email_error)}",
        )
    return {"message": "Objednavka byla odeslana. Potvrzeni jsme poslali na vas e-mail."}


@app.get("/preview-email", response_class=HTMLResponse)
async def preview_email(
    template: str = Query("customer", pattern="^(customer|owner)$"),
    lang: str = Query("cs", pattern="^(cs|en)$"),
):
    """Preview endpoint for email HTML templates in browser."""
    now = datetime.now()
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