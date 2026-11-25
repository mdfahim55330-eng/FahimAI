# FahimAI v2.0 💙

Bilingual (Bangla + English) romantic AI companion with a blue holographic-inspired interface.

## Included
- Responsive dark-blue interface and animated holographic orb.
- Cute, warm, respectful, gently romantic assistant personality.
- Bangla / English interface selector.
- AI chat through a server-side OpenAI-compatible Chat Completions request.
- Browser speech recognition for voice input (Chrome/Edge support varies).
- Browser text-to-speech replies. Available voice, accent and gender depend on voices installed by the browser/OS; a specific cute female voice is not guaranteed.
- Session-only conversation context and locally saved language preference.
- Memory and Skills information panels.

## Run locally
1. Use Node.js 20 or newer.
2. Copy `.env.example` to `.env`.
3. Set `OPENAI_API_KEY` in `.env`. Never commit this secret.
4. Run `npm install` then `npm start`.
5. Open http://localhost:3000.

## Render
Build command: `npm install`
Start command: `npm start`
Set `OPENAI_API_KEY` in Render's Environment settings. Optionally set `OPENAI_MODEL`; default is `gpt-4o-mini`.

## Limitations
The avatar is a CSS animated holographic orb, not a photorealistic 3D human. Voice is provided by the browser/OS and is not a custom voice clone. Conversation memory is not persistent across sessions or devices. External apps, unrestricted web browsing, email, payments, local files and computer control are not enabled. Those capabilities need separate integrations, scoped permissions and confirmation for consequential actions.

Keep all API keys server-side. Do not put secrets in frontend JavaScript or GitHub.
