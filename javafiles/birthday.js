// Slideshow image logic
const boyImages = [
    "https://i.ibb.co/4wj3hGQ5/image.png",
    "https://i.ibb.co/bRF3YfZR/image.png"
    //add more 
];

let slideIndex = 0;
setInterval(() => {
    slideIndex = (slideIndex + 1) % boyImages.length;
    document.getElementById("slideshowImg").src = boyImages[slideIndex];
}, 3000); // 3 seconds delay between images


function showCake() {
    document.getElementById("cakeArea").style.display = "block";
}

function cutCake() {
    document.getElementById("cakeArea").style.display = "block";
    document.getElementById("ageText").style.display = "block";
    animateAge("From 20 --> 21");
}

function lightCandle() {
    document.getElementById("flame").style.display = "block";
    document.getElementById("birthdayAudio").play();

}

function celebrateAll() {
    cutCake();
    lightCandle();
    setTimeout(() => {
        document.getElementById("flame").style.display = "none";
        document.getElementById("clapSound").play();

        flyBalloons();
    }, 2000);
}

function animateAge(text) {
    let i = 0;
    const ageText = document.getElementById("ageText");
    ageText.innerHTML = "";
    const interval = setInterval(() => {
        if (i < text.length) {
            ageText.innerHTML += text[i];
            i++;
        } else {
            clearInterval(interval);
        }
    }, 80);

}

function flyBalloons() {
    for (let i = 0; i < 15; i++) {
        let balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.left = Math.random() * 100 + "vw";
        balloon.style.backgroundColor = ["#d32f2f", "#303f9f", "#388e3c", "#fbc02d"][Math.floor(Math.random() * 4)];
        balloon.style.animationDuration = (Math.random() * 5 + 4) + "s";
        document.body.appendChild(balloon);
        setTimeout(() => balloon.remove(), 8000);
    }
}

function showLetter() {
    const text = "my letter to your friend";
    let i = 0;
    const box = document.getElementById("letterBox");
    box.style.display = "block";
    box.innerHTML = '<button onclick="closeLetterBox()" style="padding: 10px 15px; border-radius: 10px; margin-left: 10px;background-color: #cb0606;color:#f3f3f3;font-weight:bold">Close</button><br><br>';

    const interval = setInterval(() => {
        if (i < text.length) {
            box.innerHTML += text[i] === '\n' ? '<br>' : text[i];
            i++;
        } else {
            clearInterval(interval);
        }
    }, 69);
    document.getElementById("readletter").play();
}
function closeLetterBox() {
    document.getElementById('letterBox').style.display = 'none';
    const audio = document.getElementById('readletter');
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }

}
function toggleSecretPopup() {
    document.getElementById('secretMsgPopup').style.display = 'block';
    document.getElementById('responseMsg').innerText = "";
    document.getElementById('secretMessage').value = "";
}

function closePopup() {

    document.getElementById('secretMsgPopup').style.display = 'none';
}

function sendMessage() {
    const message = document.getElementById('secretMessage').value.trim();
    if (message === "") {
        alert("Please write a message before sending!");
        return;
    }

    fetch('/save-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                document.getElementById('responseMsg').innerText = "Message sent successfully!";
                document.getElementById('secretMessage').value = "";
            } else {
                document.getElementById('responseMsg').innerText = "Failed to send message.";
            }
        })
        .catch(() => {
            document.getElementById('responseMsg').innerText = "Error sending message.";
        });
}


