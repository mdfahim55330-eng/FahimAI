# FahimAI 💙

A romantic, warm AI companion with a neon holographic-inspired interface, chat, and browser voice input.

## Requirements
- Node.js 18+
- An OpenAI API key

## Run locally
1. Copy `.env.example` to `.env`.
2. Set `OPENAI_API_KEY` in `.env`. Never put the key in frontend JavaScript or commit it.
3. Run `npm install`.
4. Run `npm start`.
5. Open http://localhost:3000

## Deploy
Deploy as a Node web service. Build/install command: `npm install`; start command: `npm start`. Add `OPENAI_API_KEY` and optionally `OPENAI_MODEL` as private environment variables in the hosting dashboard.

## Current features
- Responsive dark neon interface and animated holographic-style orb
- Bangla-friendly romantic companion personality
- AI chat through a server-side API route
- Browser speech-to-text where supported
- Quick conversation prompts and reset chat

## Important limitations
This starter does not have unrestricted control of your computer, accounts, or the internet. Skills such as email, calendar, file operations, web browsing, and app control need separate integrations, explicit permissions, and safety confirmations. Voice output and a fully rendered 3D character can be added as subsequent modules. Chat history currently lives in the browser session and is not a cloud-synced long-term memory.
