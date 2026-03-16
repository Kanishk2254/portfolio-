async function sendMessage(){

const input=document.getElementById("chatInput")
const chatBox=document.getElementById("chatBox")

const message=input.value.trim()

if(!message) return

chatBox.innerHTML+=`<p><b>You:</b> ${message}</p>`

input.value=""

const loading=document.createElement("p")
loading.innerHTML="<b>AI:</b> ..."
chatBox.appendChild(loading)

const response=await fetch("http://localhost:5000/chat",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({message})

})

const data=await response.json()

loading.remove()

typeWriter(data.reply)

}

function typeWriter(text){

const chatBox=document.getElementById("chatBox")

let i=0

const msg=document.createElement("p")

msg.innerHTML="<b>AI:</b> "

chatBox.appendChild(msg)

function typing(){

if(i<text.length){

msg.innerHTML+=text.charAt(i)

i++

setTimeout(typing,15)

}

}

typing()

}