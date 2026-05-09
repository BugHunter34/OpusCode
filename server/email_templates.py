from models import OrderPayload


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
    """Vrátí předmět a tělo e-mailu pro zákazníka podle jeho jazyka."""
    lang = getattr(payload, "lang", "cs").lower()

    if lang == "en":
        rows = "".join(
            [
                _row_html("Category", payload.category),
                _row_html("Plan", payload.planName),
                _row_html("Price", payload.planPrice),
                _row_html("Received", time_string),
            ]
        )

        return {
            "subject": "Order Confirmation - OpusCode",
            "text": "\n".join(
                [
                    f"Hello {payload.fullName},",
                    "",
                    "Thank you for your order. We confirm the receipt of your request with the following details:",
                    f"- Category: {payload.category}",
                    f"- Plan: {payload.planName}",
                    f"- Price: {payload.planPrice}",
                    f"- Received: {time_string}",
                    "",
                    "We will contact you shortly with the next steps.",
                    "Please wait until someone from our team contacts you.",
                    "If you have any questions, call us or write to us by phone/email.",
                    "",
                    "OpusCode Team",
                ]
            ),
            "html": _base_email_html(
                title=f"Hello {payload.fullName},",
                  subtitle="Thank you for your order. We confirm the receipt of your request. Please wait until someone from our team contacts you. If you have any questions, call us or write to us by phone/email.",
                rows_html=rows,
            ),
        }

    rows = "".join(
        [
            _row_html("Kategorie", payload.category),
            _row_html("Plán", payload.planName),
            _row_html("Cena", payload.planPrice),
            _row_html("Přijetí objednávky", time_string),
        ]
    )

    return {
        "subject": "Potvrzení objednávky - OpusCode",
        "text": "\n".join(
            [
                f"Dobrý den {payload.fullName},",
                "",
                "děkujeme za objednávku. Potvrzujeme přijetí poptávky s těmito údaji:",
                f"- Kategorie: {payload.category}",
                f"- Plán: {payload.planName}",
                f"- Cena: {payload.planPrice}",
                f"- Přijetí objednávky: {time_string}",
                "",
                "Ozveme se vám co nejdříve s dalšími kroky.",
                "Vyčkejte, než vás někdo z našeho týmu kontaktuje.",
                "Pokud máte nějaké otázky, zavolejte nebo napište nám na číslo / e-mail.",
                "",
                "Tým OpusCode",
            ]
        ),
        "html": _base_email_html(
            title=f"Dobrý den {payload.fullName},",
              subtitle="Děkujeme za objednávku. Potvrzujeme přijetí poptávky s těmito údaji. Vyčkejte, než vás někdo z našeho týmu kontaktuje. Pokud máte nějaké otázky, zavolejte nebo napište nám na číslo / e-mail.",
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
