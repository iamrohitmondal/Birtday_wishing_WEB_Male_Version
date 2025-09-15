const clickMsg = document.getElementById("clickMessage");
const music = document.getElementById("bgMusic");
const image = document.getElementById("bg-video");
const leftHalf = document.getElementById("left-half");
const rightHalf = document.getElementById("right-half");
let hasClicked = false;
document.body.addEventListener("click", () => {

    document.getElementById("bg-video").style.display = "block";
    clickMsg.style.display = "none";

    // 1. Start animation
    leftHalf.classList.add("animate-left");
    rightHalf.classList.add("animate-right");

    // 2. Flash effect after slight delay
    setTimeout(() => {
        const flash = document.createElement("div");
        flash.classList.add("flash");
        document.body.appendChild(flash);
        flash.addEventListener("animationend", () => flash.remove());
    }, 1000);

    // 3. Play music
    music.play().catch(() => {
        console.log("Music autoplay failed.");
    });

    // 4. Redirect to birthday.html
    setTimeout(() => {
        window.location.href = "birthday.html";
    }, 3000); // Adjust if needed
});
