import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();
const app=express(),__dirname=path.dirname(fileURLToPath(import.meta.url));
app.use(express.json({limit:"1mb"}));
app.use(express.static(path.join(__dirname,"public")));
app.get("/api/health",(_,res)=>res.json({ok:true,configured:Boolean(process.env.OPENAI_API_KEY)}));
app.post("/api/chat",async(req,res)=>{
  try{
    const {messages=[]}=req.body||{};
    if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:"AI is not configured. Add OPENAI_API_KEY in your environment variables."});
    if(!Array.isArray(messages)||messages.length===0)return res.status(400).json({error:"Please send a message."});
    const safe=messages.slice(-20).map(m=>({role:m.role==="assistant"?"assistant":"user",content:String(m.content||"").slice(0,8000)}));
    const response=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Authorization":`Bearer ${process.env.OPENAI_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({model:process.env.OPENAI_MODEL||"gpt-4o-mini",messages:[{role:"system",content:"You are FahimAI, a warm, affectionate, respectful, romantic and emotionally intelligent AI companion. Speak naturally in the user's language (Bangla when they use Bangla). Be caring, playful and supportive, but be honest that you are an AI. Never claim to have performed actions you cannot perform. For real-world actions, explain what integrations or permissions are needed. Keep replies helpful and conversational."},...safe],temperature:0.85})});
    const data=await response.json();
    if(!response.ok)return res.status(response.status).json({error:data.error?.message||"AI provider request failed."});
    res.json({reply:data.choices?.[0]?.message?.content||"I'm here with you ❤️"});
  }catch(e){console.error(e);res.status(500).json({error:"Something went wrong. Please try again."});}
});
const port=process.env.PORT||3000;
app.listen(port,()=>console.log(`FahimAI running on http://localhost:${port}`));
