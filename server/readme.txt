Backend: FastAPI

Spusteni (z adresare server):
1) nainstalujte dependencies: pip install -r requirements.txt
2) nastavte SMTP promene v prostredi
3) spustte API: uvicorn main:app --host 127.0.0.1 --port 5000 --reload

Povinne SMTP/Email promene:
- SMTP_HOST
- SMTP_PORT (default 587)
- SMTP_USER
- SMTP_PASSWORD
- OWNER_EMAIL (vas e-mail, kam prijde nova objednavka)

Volitelne:
- SMTP_FROM (pokud neni zadano, pouzije se SMTP_USER)

Endpoint objednavky:
POST /order

Po prijeti objednavky backend odele:
1) notifikaci na OWNER_EMAIL
2) potvrzovaci e-mail zakaznikovi
