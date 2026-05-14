import os
import requests
import dotenv
from models import OrderPayload

dotenv.load_dotenv()

def _post_to_discord(embed: dict) -> None:
    """Helper function to actually send the POST request to Discord."""
    webhook_url = os.getenv("WEBHOOK_URL")
    if not webhook_url:
        print("Warning: WEBHOOK_URL is not set. Skipping Discord notification.")
        return

    discord_data = {
        "username": "Resender",
        "avatar_url": "https://api.andhyy.com/avatars/OpusCodeEmailerLogo.png",
        "embeds": [embed]
    }

    try:
        response = requests.post(webhook_url, json=discord_data)
        response.raise_for_status() 
    except Exception as e:
        print(f"Failed to send Discord webhook: {e}")

def send_order_to_discord(payload: OrderPayload, time_string: str) -> None:
    """Sends a standard grid order alert to a Discord Webhook."""
    
    embed = {
        "title": "Nová Objednávka",
        "color": 5814783, 
        "fields": [
            {
                "name": "Plan Details", 
                "value": f"**Category:** {payload.category}\n**Plan:** {payload.planName}\n**Price:** {payload.planPrice}", 
                "inline": False
            },
            {
                "name": "Customer Info", 
                "value": f"**Country:** {getattr(payload, 'lang', 'N/A')}\n**Name:** {payload.fullName}\n**Email:** {payload.email}\n**Phone:** {payload.phone or '-'}\n**Company:** {payload.company or '-'}", 
                "inline": False
            },
            {
                "name": "Note", 
                "value": f"```{payload.note or 'No note provided.'}```", 
                "inline": False
            }
        ],
        "footer": {
            "text": f"Received at: {time_string} • opuscode.dev"
        }
    }
    _post_to_discord(embed)

def send_calculator_to_discord(payload, time_string: str) -> None:
    """Sends a custom calculator alert to a Discord Webhook."""
    
    addons_str = ", ".join(payload.addons) if payload.addons else "Žádné"
    integrations_str = ", ".join(payload.integrations) if payload.integrations else "Žádné"

    embed = {
        "title": "Nová Poptávka z Kalkulačky!",
        "color": 16753920, # Orange/Yellow to differentiate from standard orders
        "fields": [
            {
                "name": "Project Details", 
                "value": f"**Category:** {payload.category}\n**Solution:** {payload.solution}\n**Pages:** {payload.pagesCount}\n**Hosting:** {payload.hosting}\n**Est. Price:** {payload.estimatedPrice}", 
                "inline": False
            },
            {
                "name": "Addons & Integrations",
                "value": f"**Addons:** {addons_str}\n**Integrations:** {integrations_str}",
                "inline": False
            },
            {
                "name": "Customer Info", 
                "value": f"**Country:** {payload.lang}\n**Name:** {payload.fullName}\n**Email:** {payload.email}\n**Phone:** {payload.phone or '-'}\n**Company:** {payload.company or '-'}", 
                "inline": False
            },
            {
                "name": "Note", 
                "value": f"```{payload.note or 'No note provided.'}```", 
                "inline": False
            }
        ],
        "footer": {
            "text": f"Received at: {time_string} • opuscode.dev"
        }
    }
    _post_to_discord(embed)