# FahimAI v2.1 💙

Bilingual (Bangla + English) romantic AI companion with a blue holographic-inspired interface, powered by Groq.

## Included
- Responsive dark-blue interface and animated holographic orb.
- Cute, warm, respectful, gently romantic assistant personality.
- Bangla / English interface selector.
- AI chat through Groq's OpenAI-compatible Chat Completions API.
- Default model: `openai/gpt-oss-20b` (changeable with `GROQ_MODEL`).
- Browser speech recognition for voice input (Chrome/Edge support varies).
- Browser text-to-speech replies. Available voice, accent and gender depend on voices installed by the browser/OS; a specific cute female voice is not guaranteed.
- Session-only conversation context and locally saved language preference.
- Memory and Skills information panels.

## Get a Groq API key
1. Create/sign in to your account at https://console.groq.com/.
2. Open https://console.groq.com/keys and create an API key.
3. Copy it immediately and keep it private. Never commit it to GitHub or paste it into frontend code.

Groq offers a free tier with model-specific rate limits. It is not unlimited; check your account's Limits page for current quotas.

## Run locally
1. Use Node.js 20 or newer.
2. Copy `.env.example` to `.env`.
3. Set `GROQ_API_KEY` in `.env`.
4. Run `npm install` then `npm start`.
5. Open http://localhost:3000.

## Render deployment
Build command: `npm install`
Start command: `npm start`

In Render, open your FahimAI web service → Environment → Add Environment Variable:
- Key: `GROQ_API_KEY`
- Value: your Groq API key

Optional:
- Key: `GROQ_MODEL`
- Value: `openai/gpt-oss-20b`

Save changes and redeploy/restart the service.

## Limitations
The avatar is a CSS animated holographic orb, not a photorealistic 3D human. Voice is provided by the browser/OS and is not a custom voice clone. Conversation memory is not persistent across sessions or devices. External apps, unrestricted web browsing, email, payments, local files and computer control are not enabled. Those capabilities need separate integrations, scoped permissions and confirmation for consequential actions.

Keep all API keys server-side. Do not put secrets in frontend JavaScript or GitHub.
