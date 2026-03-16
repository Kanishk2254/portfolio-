const lines = [
"Initializing Krypton AI...",
"Loading Neural Interface...",
"Connecting Systems...",
"AI Core Online",
"Welcome, Kanishk"
]

const bootText = document.getElementById("boot-text")

let index = 0

function addLine(){

if(index >= lines.length){

setTimeout(()=>{
const boot = document.getElementById("boot-screen")

boot.style.opacity = "0"

setTimeout(()=>{
boot.style.pointerEvents = "none"
},500)
},800)

return
}

const line = document.createElement("div")

line.className = "boot-line"
line.textContent = lines[index]

bootText.appendChild(line)

index++

setTimeout(addLine,700)

}

addLine()

const boot = document.getElementById("boot-screen")

boot.style.opacity = "0"

setTimeout(()=>{
boot.remove()
},700)