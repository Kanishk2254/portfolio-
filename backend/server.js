import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { portfolioContext } from "./portfolioContext.js"    

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const model = genAI.getGenerativeModel({
model: "models/gemini-2.5-flash"
})

app.post("/chat", async (req,res)=>{

try{

const userMessage = req.body.message

const prompt = `
${portfolioContext}

Visitor question: ${userMessage}

Respond naturally and explain Kanishk's work if relevant.
`
const result = await model.generateContent(prompt)
const response = await result.response

const text = response.text()

res.json({
reply:text
})

}catch(err){

console.error(err)

res.status(500).json({
reply:"AI server error"
})

}

})

app.listen(5000,()=>{
console.log("Gemini AI server running on port 5000")
})