document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    let userInput = document.getElementById("user-input");
    let message = userInput.value.trim();
    if (message === "") return;

    let chatBox = document.getElementById("chat-box");
    let promptText = document.getElementById("prompt-text");
    let geniThinking = document.getElementById("geni");

    // Masquer le texte d'accroche s'il est visible
    if (promptText && !promptText.classList.contains("hidden")) {
        promptText.classList.add("fade-out");
        setTimeout(() => {
            promptText.style.display = "none";
        }, 400);
    }

    // Ajouter le message utilisateur
    let userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    userMessage.innerHTML = `<strong>Toi :</strong> ${message}`;
    chatBox.appendChild(userMessage);

    // Jouer un son aléatoire
    playRandomSound();

    // Ajouter un effet lumineux au Génie lorsqu'il pense
    geniThinking.classList.add("glow");

    setTimeout(() => {
        fetch("/chat", {
            method: "POST",
            body: JSON.stringify({ message: message }),
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then(data => {
            // Ajouter la réponse du Génie
            let geniMessage = document.createElement("div");
            geniMessage.classList.add("message", "geni-message");
            geniMessage.innerHTML = `<strong>Génie :</strong> ${data.response}`;
            chatBox.appendChild(geniMessage);

            // Effet lumineux sur le Génie lorsqu'il parle
            genieRepond();

            // Défilement automatique fluide
            chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: "smooth" });
        });
    }, 1000);

    // Effacer le champ après envoi
    userInput.value = "";
}

// Fonction pour l'effet lumineux du Génie
function genieRepond() {
    let genie = document.getElementById("geni");

    // Ajoute l'effet lumineux
    genie.classList.add("glow");

    setTimeout(() => {
        // Enlève l'effet après 2 secondes
        genie.classList.remove("glow");
    }, 2000);
}

// Fonction pour jouer un son magique
function playRandomSound() {
    let sounds = [
        "mixkit-casting-long-fairy-magic-spell-875.mp3",
        "mixkit-magic-spell-mystery-whoosh-2345.mp3",
        "mixkit-magic-transition-sweep-presentation-2638.mp3",
        "mixkit-magical-ligth-aura-2581.mp3",
        "mixkit-shot-light-energy-flowing-2589.mp3",
        "mixkit-spellcaster-fairy-swoosh-1463.mp3"
    ];

    let randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    let audio = new Audio(`/static/sounds/${randomSound}`);
    audio.volume = 0.7;
    audio.play();
}
