const bootLines = [
"Initializing Krypton AI...",
"Loading Neural Interface...",
"Connecting Systems...",
"AI Core Online",
"Welcome, Kanishk"
]

const bootText = document.getElementById("boot-text")

let index = 0

function addLine(){

if(index >= bootLines.length){

setTimeout(()=>{
const boot = document.getElementById("boot-screen")

boot.style.opacity = "0"

setTimeout(()=>{
boot.remove()
},600)

},800)

return
}

const line = document.createElement("div")

line.className = "boot-line"
line.textContent = bootLines[index]

bootText.appendChild(line)

index++

setTimeout(addLine,700)

}

addLine()