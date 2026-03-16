document.addEventListener("DOMContentLoaded", () => {

const toggle = document.getElementById("jarvis-toggle")
const chat = document.getElementById("jarvis-chat")
const jarvisSound = new Audio("assets/jarvis-start.mp3")

if(!toggle || !chat) return

toggle.addEventListener("click", () => {

if(chat.style.display === "flex"){

chat.style.display = "none"

}
else{

chat.style.display = "flex"
chat.style.animation = "none"
chat.offsetHeight
chat.style.animation = "hologramOpen 0.4s ease"
/* play sound when opening */
jarvisSound.currentTime = 0
jarvisSound.play()

}

})

})