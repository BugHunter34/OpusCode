from models import OrderPayload

# --- Dictionary ---
EMAIL_I18N = {
    "cs": {
        "subject": "Potvrzení objednávky - OpusCode",
        "cat_label": "Kategorie",
        "plan_label": "Plán",
        "price_label": "Cena",
        "time_label": "Přijetí objednávky",
        "greeting": "Dobrý den",
        "intro": "děkujeme za objednávku. Potvrzujeme přijetí poptávky s těmito údaji:",
        "outro1": "Ozveme se vám co nejdříve s dalšími kroky.",
        "outro2": "Vyčkejte, než vás někdo z našeho týmu kontaktuje.",
        "outro3": "Pokud máte nějaké otázky, zavolejte nebo napište nám na číslo / e-mail.",
        "team": "Tým OpusCode"
    },
    "en": {
        "subject": "Order Confirmation - OpusCode",
        "cat_label": "Category",
        "plan_label": "Plan",
        "price_label": "Price",
        "time_label": "Received",
        "greeting": "Hello",
        "intro": "Thank you for your order. We confirm the receipt of your request with the following details:",
        "outro1": "We will contact you shortly with the next steps.",
        "outro2": "Please wait until someone from our team contacts you.",
        "outro3": "If you have any questions, call us or write to us by phone/email.",
        "team": "OpusCode Team"
    },
    "sk": {
        "subject": "Potvrdenie objednávky - OpusCode",
        "cat_label": "Kategória",
        "plan_label": "Plán",
        "price_label": "Cena",
        "time_label": "Prijatie objednávky",
        "greeting": "Dobrý deň",
        "intro": "ďakujeme za objednávku. Potvrdzujeme prijatie dopytu s týmito údajmi:",
        "outro1": "Ozveme sa vám čo najskôr s ďalšími krokmi.",
        "outro2": "Počkajte, kým vás niekto z nášho tímu kontaktuje.",
        "outro3": "Ak máte nejaké otázky, zavolajte alebo napíšte nám na číslo / e-mail.",
        "team": "Tím OpusCode"
    },
    "de": {
        "subject": "Bestellbestätigung - OpusCode",
        "cat_label": "Kategorie",
        "plan_label": "Plan",
        "price_label": "Preis",
        "time_label": "Bestelleingang",
        "greeting": "Hallo",
        "intro": "Vielen Dank für Ihre Bestellung. Wir bestätigen den Eingang Ihrer Anfrage mit folgenden Daten:",
        "outro1": "Wir werden uns in Kürze mit den nächsten Schritten bei Ihnen melden.",
        "outro2": "Bitte warten Sie, bis sich jemand aus unserem Team mit Ihnen in Verbindung setzt.",
        "outro3": "Wenn Sie Fragen haben, rufen Sie uns an oder schreiben Sie uns per E-Mail.",
        "team": "OpusCode Team"
    },
    "pl": {
        "subject": "Potwierdzenie zamówienia - OpusCode",
        "cat_label": "Kategoria",
        "plan_label": "Plan",
        "price_label": "Cena",
        "time_label": "Otrzymano",
        "greeting": "Dzień dobry",
        "intro": "dziękujemy za zamówienie. Potwierdzamy otrzymanie zapytania z następującymi danymi:",
        "outro1": "Skontaktujemy się z Tobą wkrótce w sprawie kolejnych kroków.",
        "outro2": "Prosimy o cierpliwość, aż ktoś z naszego zespołu się z Tobą skontaktuje.",
        "outro3": "Jeśli masz pytania, zadzwoń lub napisz do nas e-mail.",
        "team": "Zespół OpusCode"
    }
}


def _base_email_html(*, title: str, subtitle: str, rows_html: str, note_block: str = "") -> str:
    """Shared HTML frame for both owner and customer emails."""
    return f"""<!doctype html>
<html lang=\"cs\">
  <body style=\"margin:0;padding:0;background:#f4f6fb;font-family:Arial,Helvetica,sans-serif;color:#1f2937;\">
    <table role=\"presentation\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"background:#f4f6fb;padding:24px 12px;\">
      <tr>
        <td align=\"center\">
          <table role=\"presentation\" width=\"640\" cellspacing=\"0\" cellpadding=\"0\" style=\"max-width:640px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;\">
            <tr>
              <td style=\"padding:24px 28px;background:linear-gradient(120deg,#0f172a,#1e293b);color:#f8fafc;\">
                <p style=\"margin:0 0 8px 0;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#cbd5e1;\">OpusCode</p>
                <h1 style=\"margin:0;font-size:24px;line-height:1.2;font-weight:700;\">{title}</h1>
                <p style=\"margin:10px 0 0 0;font-size:14px;line-height:1.5;color:#dbeafe;\">{subtitle}</p>
              </td>
            </tr>
            <tr>
              <td style=\"padding:20px 28px 8px 28px;\">
                <table role=\"presentation\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"border-collapse:collapse;\">
                  {rows_html}
                </table>
              </td>
            </tr>
            {note_block}
            <tr>
              <td style=\"padding:20px 28px 24px 28px;\">
                <p style=\"margin:0;font-size:12px;line-height:1.6;color:#64748b;\">Tento e-mail byl odeslán automaticky ze systému OpusCode.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>"""


def _row_html(label: str, value: str) -> str:
    return f"""
    <tr>
      <td style=\"padding:10px 12px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:700;color:#334155;width:35%;vertical-align:top;\">{label}</td>
      <td style=\"padding:10px 12px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#0f172a;\">{value}</td>
    </tr>
    """

def get_customer_email(payload, time_string: str) -> dict:
    """Returns the subject and body of the customer email based on their language."""
    # Get code
    lang_code = getattr(payload, "lang", "en").lower()
    if lang_code not in EMAIL_I18N:
        lang_code = "en"
        
    t = EMAIL_I18N[lang_code]

    # build rows - dynamic
    rows = "".join([
        _row_html(t["cat_label"], payload.category),
        _row_html(t["plan_label"], payload.planName),
        _row_html(t["price_label"], payload.planPrice),
        _row_html(t["time_label"], time_string),
    ])

    # Formated email parts
    return {
        "subject": t["subject"],
        "text": "\n".join([
            f"{t['greeting']} {payload.fullName},",
            "",
            t["intro"],
            f"- {t['cat_label']}: {payload.category}",
            f"- {t['plan_label']}: {payload.planName}",
            f"- {t['price_label']}: {payload.planPrice}",
            f"- {t['time_label']}: {time_string}",
            "",
            t["outro1"],
            t["outro2"],
            t["outro3"],
            "",
            t["team"],
        ]),
        "html": _base_email_html(
            title=f"{t['greeting']} {payload.fullName},",
            subtitle=f"{t['intro']} {t['outro2']} {t['outro3']}",
            rows_html=rows,
        ),
    }


def get_owner_email(payload, time_string: str) -> dict:
    """Vrátí předmět a tělo e-mailu pro majitele webu."""
    lang = getattr(payload, "lang", "cs").upper()

    rows = "".join(
        [
            _row_html("Přijetí objednávky", time_string),
            _row_html("Jazyk zákazníka", lang),
            _row_html("Kategorie", payload.category),
            _row_html("Plán", payload.planName),
            _row_html("Cena", payload.planPrice),
            _row_html("Jméno", payload.fullName),
            _row_html("Email", payload.email),
            _row_html("Telefon", payload.phone or "-"),
            _row_html("Firma", payload.company or "-"),
        ]
    )

    note_block = f"""
    <tr>
      <td style=\"padding:10px 28px 4px 28px;font-size:12px;letter-spacing:.8px;text-transform:uppercase;color:#64748b;\">Poznámka</td>
    </tr>
    <tr>
      <td style=\"padding:0 28px 20px 28px;\">
        <div style=\"padding:12px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;font-size:13px;color:#0f172a;line-height:1.5;\">{payload.note or "-"}</div>
      </td>
    </tr>
    """

    return {
        "subject": f"Nová objednávka: {payload.category} / {payload.planName}",
        "text": "\n".join(
            [
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
            ]
        ),
        "html": _base_email_html(
            title="Nová objednávka z webu",
            subtitle="Přehled poptávky odeslané přes formulář na opuscode.dev.",
            rows_html=rows,
            note_block=note_block,
        ),
    }
