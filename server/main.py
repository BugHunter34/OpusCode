import os
import resend
import dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from datetime import datetime
from email_templates import get_customer_email, get_owner_email
from models import TextPayload, OrderPayload
from rediscord import send_to_discord

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
    now = datetime.now()
    time_string = now.strftime("%d. %m. %H:%M") 

    resend.api_key = _require_env("RESEND_API_KEY", "ERROR")
    sender_email = os.getenv("RESEND_FROM", "nameerror@andhyy.com").strip()
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
        "text": owner_email_data["text"]
    })

    # --- Email to Customer ---
    customer_email_data = get_customer_email(payload, time_string)
    resend.Emails.send({
        "from": sender_email,
        "to": [payload.email],
        "subject": customer_email_data["subject"],
        "text": customer_email_data["text"]
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
            detail=f"Objednavku se nepodarilo odeslat e-mailem. {str(email_error)} yo",
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