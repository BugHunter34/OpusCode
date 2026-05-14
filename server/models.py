from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List

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


class CalculatorPayload(BaseModel):
    lang: str = "cs"
    category: str
    solution: Optional[str] = None
    pagesCount: int
    addons: List[str]
    integrations: List[str]
    hosting: str
    estimatedPrice: str
    fullName: str
    email: str
    phone: Optional[str] = ""
    company: Optional[str] = ""
    note: Optional[str] = ""
    gdprConsent: bool
