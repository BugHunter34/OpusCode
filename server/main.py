import os
import smtplib
from email.message import EmailMessage

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="24-7 Solutions API")


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://opuscode.dev",
    "https://www.opuscode.dev",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextPayload(BaseModel):
    text: str


class OrderPayload(BaseModel):
    category: str
    planName: str
    planPrice: str
    fullName: str
    email: str
    phone: str = ""
    company: str = ""
    note: str = ""
    gdprConsent: bool


def _require_env(name: str) -> str:
    value = os.getenv(name, "").strip()
    if not value:
        raise RuntimeError(f"Missing required environment variable: {name}")
    return value


def _send_order_emails(payload: OrderPayload) -> None:
    smtp_host = _require_env("SMTP_HOST")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = _require_env("SMTP_USER")
    smtp_password = _require_env("SMTP_PASSWORD")
    smtp_from = os.getenv("SMTP_FROM", smtp_user).strip()
    owner_email = _require_env("OWNER_EMAIL")

    owner_msg = EmailMessage()
    owner_msg["Subject"] = f"Nova objednavka: {payload.category} / {payload.planName}"
    owner_msg["From"] = smtp_from
    owner_msg["To"] = owner_email
    owner_msg["Reply-To"] = payload.email
    owner_msg.set_content(
        "\n".join(
            [
                "Byla vytvorena nova objednavka z webu.",
                "",
                f"Kategorie: {payload.category}",
                f"Plan: {payload.planName}",
                f"Cena: {payload.planPrice}",
                "",
                f"Jmeno: {payload.fullName}",
                f"Email: {payload.email}",
                f"Telefon: {payload.phone or '-'}",
                f"Firma: {payload.company or '-'}",
                "",
                "Poznamka:",
                payload.note or "-",
            ]
        )
    )

    customer_msg = EmailMessage()
    customer_msg["Subject"] = "Potvrzeni objednavky - OpusCode"
    customer_msg["From"] = smtp_from
    customer_msg["To"] = payload.email
    customer_msg.set_content(
        "\n".join(
            [
                f"Dobry den {payload.fullName},",
                "",
                "dekujeme za objednavku. Potvrzujeme prijeti poptavky s temito udaji:",
                f"- Kategorie: {payload.category}",
                f"- Plan: {payload.planName}",
                f"- Cena: {payload.planPrice}",
                "",
                "Ozveme se vam co nejdrive s dalsimi kroky.",
                "",
                "OpusCode",
            ]
        )
    )

    with smtplib.SMTP(smtp_host, smtp_port, timeout=20) as smtp:
        smtp.starttls()
        smtp.login(smtp_user, smtp_password)
        smtp.send_message(owner_msg)
        smtp.send_message(customer_msg)

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
        raise HTTPException(status_code=500, detail=str(env_error)) from env_error
    except Exception as email_error:
        raise HTTPException(
            status_code=500,
            detail="Objednavku se nepodarilo odeslat e-mailem. Zkontrolujte SMTP nastaveni.",
        ) from email_error

    return {"message": "Objednavka byla odeslana. Potvrzeni jsme poslali na vas e-mail."}

