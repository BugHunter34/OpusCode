import os
import requests
from models import OrderPayload
import dotenv

dotenv.load_dotenv()

def send_to_discord(payload: OrderPayload, time_string: str) -> None:
    """Sends a formatted commission alert to a Discord Webhook."""
    
    webhook_url = os.getenv("WEBHOOK_URL")
    if not webhook_url:
        print("Warning: WEBHOOK_URL is not set. Skipping Discord notification.")
        return

    embed = {
        "title": "New Commission / Order!",
        "color": 5814783, 
        "fields": [
            {
                "name": "Plan Details", 
                "value": f"**Category:** {payload.category}\n**Plan:** {payload.planName}\n**Price:** {payload.planPrice}", 
                "inline": False
            },
            {
                "name": "Customer Info", 
                "value": f"**Name:** {payload.fullName}\n**Email:** {payload.email}\n**Phone:** {payload.phone or '-'}\n**Company:** {payload.company or '-'}", 
                "inline": False
            },
            {
                "name": "Note", 
                "value": f"```{payload.note or 'No note provided.'}```", 
                "inline": False
            }
        ],
        "footer": {
            "text": f"Received at: {time_string} • andhyy.com"
        }
    }

    # Wrap it to discord
    discord_data = {
        "username": "Resender",
        "avatar_url": "https://api.andhyy.com/avatars/OpusCodeEmailerLogo.png",
        "embeds": [embed]
    }

    try:
        # Send POST to Discord
        response = requests.post(webhook_url, json=discord_data)
        response.raise_for_status() 
    except Exception as e:
        print(f"Failed to send Discord webhook: {e}")