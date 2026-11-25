import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

const systemPrompt = "You are FahimAI, a cute, warm, affectionate and respectful bilingual AI companion. Your tone is gently romantic, caring, playful and encouraging, never possessive or manipulative. Reply in Bangla when the user writes Bangla, English when they write English, and naturally mix them when the user does. You are an AI, not a human. Never claim to have performed a real-world action unless an enabled tool confirms it. Help with writing, learning, planning, coding, brainstorming and explanations. If external access or an action is needed but unavailable, explain clearly. Do not invent personal memories.";

app.get("/api/health", (_, res) => res.json({
  ok: true,
  name: "FahimAI",
  version: "2.1.0",
  provider: "Groq",
  configured: Boolean(process.env.GROQ_API_KEY)
}));

app.post("/api/chat", async (req, res) => {
  try {
    const { messages = [] } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0 || messages.length > 40) {
      return res.status(400).json({ error: "Please send a valid conversation." });
    }
    if (!process.env.GROQ_API_KEY) {
      return res.status(503).json({ error: "FahimAI is not connected yet. Add GROQ_API_KEY in your Render Environment settings." });
    }
    const safe = messages
      .filter(m => m && ["user", "assistant"].includes(m.role) && typeof m.content === "string")
      .slice(-30)
      .map(m => ({ role: m.role, content: m.content.slice(0, 12000) }));

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || "openai/gpt-oss-20b",
        messages: [{ role: "system", content: systemPrompt }, ...safe],
        temperature: 0.85,
        max_completion_tokens: 2048
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Groq API error:", data?.error?.message || response.status);
      const status = response.status === 429 ? 429 : (response.status === 401 ? 503 : 502);
      return res.status(status).json({
        error: response.status === 429
          ? "The free Groq request limit has been reached. Please wait and try again."
          : "The AI service could not complete the request. Check your Groq API key and model settings."
      });
    }

    res.json({
      reply: data.choices?.[0]?.message?.content || "I'm here with you. Could you say that another way?"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

app.get("*", (_, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`FahimAI v2.1 running on port ${port}`));
