import openai
import os
from dotenv import load_dotenv

# Charger les variables d'environnement
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    print("❌ Erreur : Clé API OpenAI non trouvée. Vérifie ton fichier .env !")
    exit()

# Client OpenAI
client = openai.OpenAI(api_key=api_key)

# Stocker l'historique des messages
chat_history = []

# Fonction pour interagir avec OpenAI
def ask_openai(prompt):
    global chat_history

    # Ajouter le message utilisateur à l'historique
    chat_history.append({"role": "user", "content": prompt})

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=chat_history  # Envoyer tout l'historique
        )
        bot_response = response.choices[0].message.content

        # Ajouter la réponse de Génî à l'historique
        chat_history.append({"role": "assistant", "content": bot_response})

        return bot_response
    except openai.APIError as e:
        return f"Erreur OpenAI : {str(e)}"
    except Exception as e:
        return f"Erreur serveur : {str(e)}"
