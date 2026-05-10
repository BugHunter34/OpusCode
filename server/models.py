from pydantic import BaseModel, EmailStr


class TextPayload(BaseModel):
    text: str

class OrderPayload(BaseModel):
    category: str
    planName: str
    planPrice: str 
    fullName: str
    email: EmailStr
    phone: str
    company: str
    note: str
    gdprConsent: bool
    lang: str
