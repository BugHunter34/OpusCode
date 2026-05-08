from models import OrderPayload

def get_customer_email(payload, time_string: str) -> dict:
    """Vrátí předmět a tělo e-mailu pro zákazníka podle jeho jazyka."""
    # Získáme jazyk z payloadu (defaultně 'cs', pokud by chyběl)
    lang = getattr(payload, 'lang', 'cs').lower()

    if lang == 'en':
        return {
            "subject": "Order Confirmation - OpusCode",
            "text": "\n".join([
                f"Hello {payload.fullName},", 
                "",
                "Thank you for your order. We confirm the receipt of your request with the following details:",
                f"- Category: {payload.category}",
                f"- Plan: {payload.planName}",
                f"- Price: {payload.planPrice}",
                f"- Received: {time_string}",
                "",
                "We will contact you shortly with the next steps.",
                "",
                "OpusCode Team"
            ])
        }
    
    # Výchozí čeština (fallback)
    return {
        "subject": "Potvrzení objednávky - OpusCode",
        "text": "\n".join([
            f"Dobrý den {payload.fullName},",
            "",
            "děkujeme za objednávku. Potvrzujeme přijetí poptávky s těmito údaji:",
            f"- Kategorie: {payload.category}",
            f"- Plán: {payload.planName}",
            f"- Cena: {payload.planPrice}",
            f"- Přijetí objednávky: {time_string}",
            "",
            "Ozveme se vám co nejdříve s dalšími kroky.",
            "",
            "Tým OpusCode"
        ])
    }

def get_owner_email(payload, time_string: str) -> dict:
    """Vrátí předmět a tělo e-mailu pro majitele webu."""
    # E-mail pro tebe může být vždy česky, jen přidáme informaci o jazyku zákazníka
    lang = getattr(payload, 'lang', 'cs').upper()
    
    return {
        "subject": f"Nová objednávka: {payload.category} / {payload.planName}",
        "text": "\n".join([
            "Byla vytvořena nová objednávka z webu.",
            "",
            f"Přijetí objednávky: {time_string}",
            f"Jazyk zákazníka: {lang}",
            f"Kategorie: {payload.category}",
            f"Plán: {payload.planName}",
            f"Cena: {payload.planPrice}",
            "",
            f"Jméno: {payload.fullName}",
            f"Email: {payload.email}",
            f"Telefon: {payload.phone or '-'}",
            f"Firma: {payload.company or '-'}",
            "",
            "Poznámka:",
            payload.note or "-",
        ])
    }