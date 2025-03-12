import os  # ✅ Déplacer ici, tout en haut !

from flask import Flask, render_template, request, jsonify
from api import ask_openai  # Fonction qui interroge OpenAI

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get("message")

    if not user_message:
        return jsonify({"response": "Aucune question reçue."}), 400

    response = ask_openai(user_message)  # Génie répond via OpenAI
    return jsonify({'response': response})


# Vérifie si on est en local
is_local = os.environ.get("RAILWAY_ENVIRONMENT") is None  

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001 if is_local else 5000))  
    app.run(host="0.0.0.0", port=port)

