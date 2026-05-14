from models import OrderPayload, CalculatorPayload

# --- Dictionary ---
EMAIL_I18N = {
    "cs": {
        "subject": "Potvrzení objednávky - OpusCode",
        "calc_subject": "Potvrzení kalkulace - OpusCode",
        "cat_label": "Kategorie",
        "plan_label": "Plán",
        "solution_label": "Řešení",
        "pages_label": "Počet stránek",
        "addons_label": "Doplňky",
        "integrations_label": "Integrace",
        "hosting_label": "Hosting",
        "price_label": "Cena",
        "est_price_label": "Odhadovaná cena",
        "time_label": "Přijetí",
        "empty_val": "Žádné",
        "greeting": "Dobrý den",
        "intro": "děkujeme za objednávku. Potvrzujeme přijetí poptávky s těmito údaji:",
        "calc_intro": "děkujeme za Vaši poptávku z naší cenové kalkulačky. Níže zasíláme shrnutí:",
        "outro1": "Ozveme se vám co nejdříve s dalšími kroky.",
        "outro2": "Vyčkejte, než vás někdo z našeho týmu kontaktuje.",
        "outro3": "Pokud máte nějaké otázky, zavolejte nebo napište nám na číslo / e-mail.",
        "team": "Tým OpusCode",
        "automatic": "Tento e-mail byl odeslán automaticky ze systému OpusCode"
    },
    "en": {
        "subject": "Order Confirmation - OpusCode",
        "calc_subject": "Calculation Confirmation - OpusCode",
        "cat_label": "Category",
        "plan_label": "Plan",
        "solution_label": "Solution",
        "pages_label": "Page count",
        "addons_label": "Add-ons",
        "integrations_label": "Integrations",
        "hosting_label": "Hosting",
        "price_label": "Price",
        "est_price_label": "Estimated price",
        "time_label": "Received",
        "empty_val": "None",
        "greeting": "Hello",
        "intro": "Thank you for your order. We confirm the receipt of your request with the following details:",
        "calc_intro": "Thank you for your inquiry from our price calculator. Here is the summary:",
        "outro1": "We will contact you shortly with the next steps.",
        "outro2": "Please wait until someone from our team contacts you.",
        "outro3": "If you have any questions, call us or write to us by phone/email.",
        "team": "OpusCode Team",
        "automatic": "This email was sent automatically by the OpusCode system"
    },
    "sk": {
        "subject": "Potvrdenie objednávky - OpusCode",
        "calc_subject": "Potvrdenie kalkulácie - OpusCode",
        "cat_label": "Kategória",
        "plan_label": "Plán",
        "solution_label": "Riešenie",
        "pages_label": "Počet stránok",
        "addons_label": "Doplnky",
        "integrations_label": "Integrácie",
        "hosting_label": "Hosting",
        "price_label": "Cena",
        "est_price_label": "Odhadovaná cena",
        "time_label": "Prijatie",
        "empty_val": "Žiadne",
        "greeting": "Dobrý deň",
        "intro": "ďakujeme za objednávku. Potvrdzujeme prijatie dopytu s týmito údajmi:",
        "calc_intro": "ďakujeme za Váš dopyt z našej cenovej kalkulačky. Nižšie zasielame zhrnutie:",
        "outro1": "Ozveme sa vám čo najskôr s ďalšími krokmi.",
        "outro2": "Počkajte, kým vás niekto z nášho tímu kontaktuje.",
        "outro3": "Ak máte nejaké otázky, zavolajte alebo napíšte nám na číslo / e-mail.",
        "team": "Tím OpusCode",
        "automatic": "Tento e-mail bol zaslaný automaticky systémom OpusCode"
    },
    "de": {
        "subject": "Bestellbestätigung - OpusCode",
        "calc_subject": "Kalkulationsbestätigung - OpusCode",
        "cat_label": "Kategorie",
        "plan_label": "Plan",
        "solution_label": "Lösung",
        "pages_label": "Seitenanzahl",
        "addons_label": "Zusatzfunktionen",
        "integrations_label": "Integrationen",
        "hosting_label": "Hosting",
        "price_label": "Preis",
        "est_price_label": "Richtpreis",
        "time_label": "Bestelleingang",
        "empty_val": "Keine",
        "greeting": "Hallo",
        "intro": "Vielen Dank für Ihre Bestellung. Wir bestätigen den Eingang Ihrer Anfrage mit folgenden Daten:",
        "calc_intro": "Vielen Dank für Ihre Anfrage über unseren Preisrechner. Hier ist die Zusammenfassung:",
        "outro1": "Wir werden uns in Kürze mit den nächsten Schritten bei Ihnen melden.",
        "outro2": "Bitte warten Sie, bis sich jemand aus unserem Team mit Ihnen in Verbindung setzt.",
        "outro3": "Wenn Sie Fragen haben, rufen Sie uns an oder schreiben Sie uns per E-Mail.",
        "team": "OpusCode Team",
        "automatic": "Dieses E-Mail wurde automatisch vom OpusCode-System gesendet"
    },
    "pl": {
        "subject": "Potwierdzenie zamówienia - OpusCode",
        "calc_subject": "Potwierdzenie kalkulacji - OpusCode",
        "cat_label": "Kategoria",
        "plan_label": "Plan",
        "solution_label": "Rozwiązanie",
        "pages_label": "Liczba podstron",
        "addons_label": "Dodatki",
        "integrations_label": "Integracje",
        "hosting_label": "Hosting",
        "price_label": "Cena",
        "est_price_label": "Cena orientacyjna",
        "time_label": "Otrzymano",
        "empty_val": "Brak",
        "greeting": "Dzień dobry",
        "intro": "Dziękujemy za zamówienie. Potwierdzamy otrzymanie zapytania z następującymi danymi:",
        "calc_intro": "Dziękujemy za zapytanie z naszego kalkulatora cen. Poniżej znajduje się podsumowanie:",
        "outro1": "Skontaktujemy się z Tobą wkrótce w sprawie kolejnych kroków.",
        "outro2": "Prosimy o cierpliwość, ktoś z naszego zespołu się z Tobą skontaktuje.",
        "outro3": "Jeśli masz pytania, zadzwoń lub napisz do nas e-mail.",
        "team": "Zespół OpusCode",
        "automatic": "Ten e-mail został wysłany automatycznie systemem OpusCode"
    }
}


def _base_email_html(*, title: str, subtitle: str, rows_html: str, note_block: str = "", footer_text: str = "") -> str:
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
                <p style=\"margin:0;font-size:12px;line-height:1.6;color:#64748b;\">{footer_text}.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>"""


def _get_lang_dict(lang_str: str) -> dict:
    base = lang_str.split("-")[0].lower() if lang_str else "en"
    return EMAIL_I18N.get(base, EMAIL_I18N["en"])

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
            footer_text=t["automatic"],
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

def get_calculator_customer_email(payload: CalculatorPayload, time_string: str) -> dict:
    t = _get_lang_dict(payload.lang)
    
    addons_str = ", ".join(payload.addons) if payload.addons else t["empty_val"]
    integrations_str = ", ".join(payload.integrations) if payload.integrations else t["empty_val"]
    
    rows = "".join([
        _row_html(t["cat_label"], payload.category),
        _row_html(t["solution_label"], payload.solution or "-"),
        _row_html(t["pages_label"], str(payload.pagesCount)),
        _row_html(t["addons_label"], addons_str),
        _row_html(t["integrations_label"], integrations_str),
        _row_html(t["hosting_label"], payload.hosting),
        _row_html(t["est_price_label"], payload.estimatedPrice),
    ])

    return {
        "subject": t["calc_subject"],
        "text": f"{t['greeting']} {payload.fullName},\n\n{t['calc_intro']}\n- {payload.category}\n- {payload.solution}\n- {payload.estimatedPrice}\n\n{t['outro1']}\n{t['team']}",
        "html": _base_email_html(
            title=f"{t['greeting']} {payload.fullName},",
            subtitle=f"{t['calc_intro']} {t['outro2']} {t['outro3']}",
            rows_html=rows,
            footer_text=t["automatic"],
        ),
    }

def get_calculator_owner_email(payload: CalculatorPayload, time_string: str) -> dict:
    lang = getattr(payload, "lang", "cs").upper()
    addons_str = ", ".join(payload.addons) if payload.addons else "Žádné"
    integrations_str = ", ".join(payload.integrations) if payload.integrations else "Žádné"

    rows = "".join([
        _row_html("Přijetí", time_string),
        _row_html("Jazyk", lang),
        _row_html("Kategorie", payload.category),
        _row_html("Řešení", payload.solution or "-"),
        _row_html("Stránek", str(payload.pagesCount)),
        _row_html("Doplňky", addons_str),
        _row_html("Integrace", integrations_str),
        _row_html("Hosting", payload.hosting),
        _row_html("Odhad ceny", payload.estimatedPrice),
        _row_html("Jméno", payload.fullName),
        _row_html("Email", payload.email),
        _row_html("Telefon", payload.phone or "-"),
        _row_html("Firma", payload.company or "-"),
    ])

    note_block = f"""
    <tr><td style="padding:10px 28px 4px 28px;font-size:12px;letter-spacing:.8px;text-transform:uppercase;color:#64748b;">Poznámka od klienta</td></tr>
    <tr><td style="padding:0 28px 20px 28px;"><div style="padding:12px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;font-size:13px;color:#0f172a;line-height:1.5;">{payload.note or "-"}</div></td></tr>
    """

    return {
        "subject": f"Nová kalkulace: {payload.category} - {payload.fullName}",
        "text": f"Nová kalkulace od {payload.fullName} ({payload.email}).\nCena: {payload.estimatedPrice}\nPoznámka: {payload.note}",
        "html": _base_email_html(title="Nová kalkulace z webu", subtitle="Výsledek interaktivní kalkulačky na opuscode.dev.", rows_html=rows, note_block=note_block),
    }