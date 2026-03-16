document.addEventListener("DOMContentLoaded", () => {

initTypewriter()
initFilters()
initClipboard()

})


// ================= TYPEWRITER =================

function initTypewriter(){

const txtElement=document.querySelector(".txt-type")

if(!txtElement) return

const words=JSON.parse(txtElement.getAttribute("data-words"))

let wordIndex=0
let charIndex=0
let deleting=false

function type(){

const word=words[wordIndex]

if(!deleting){
charIndex++
}else{
charIndex--
}

txtElement.textContent=word.substring(0,charIndex)

let speed=100

if(!deleting && charIndex===word.length){

speed=1500
deleting=true

}else if(deleting && charIndex===0){

deleting=false
wordIndex=(wordIndex+1)%words.length

}

setTimeout(type,speed)

}

type()

}


// ================= PROJECT FILTER =================

function initFilters(){

const buttons=document.querySelectorAll(".filter-btn")
const cards=document.querySelectorAll(".project-card")

if(buttons.length===0 || cards.length===0) return

buttons.forEach(btn=>{

btn.addEventListener("click",()=>{

buttons.forEach(b=>b.classList.remove("active"))
btn.classList.add("active")

const filter=btn.dataset.filter

cards.forEach(card=>{

if(filter==="all" || card.dataset.category===filter){

card.style.display="block"

}else{

card.style.display="none"

}

})

})

})

}


// ================= CLIPBOARD =================

function initClipboard(){

const buttons=document.querySelectorAll(".copy-trigger")

if(buttons.length===0) return

buttons.forEach(btn=>{

btn.addEventListener("click",()=>{

const parent=btn.closest(".contact-info-box")

if(!parent) return

const textElement=parent.querySelector("span")

if(!textElement) return

const text=textElement.innerText

navigator.clipboard.writeText(text)

const popup=parent.querySelector(".copy-popup")

if(popup){

popup.classList.add("visible")

setTimeout(()=>{

popup.classList.remove("visible")

},1500)

}

})

})

}

const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("visible")
}
})
})

document.querySelectorAll(".project-card").forEach(card=>{
observer.observe(card)
})

const jarvisBtn=document.getElementById("jarvis-toggle")
const jarvisChat=document.getElementById("jarvis-chat")

jarvisBtn.addEventListener("click",()=>{

if(jarvisChat.style.display==="flex"){
jarvisChat.style.display="none"
}else{
jarvisChat.style.display="flex"
}

})

document.addEventListener("DOMContentLoaded",()=>{

const jarvisBtn = document.getElementById("jarvis-toggle")
const jarvisChat = document.getElementById("jarvis-chat")

if(jarvisBtn && jarvisChat){

jarvisBtn.addEventListener("click",()=>{

if(jarvisChat.style.display==="flex"){

jarvisChat.style.display="none"

}else{

jarvisChat.style.display="flex"

}

})

}

})