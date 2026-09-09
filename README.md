# Mandarin Fast Track

A lightweight Mandarin learning app focused on useful Chinese: high-frequency characters, practical words and sentences, tones, listening, production, and adaptive review.

## Current features

- 1,000+ unique Chinese character bank
- Detailed frequency-first core character deck with pinyin, meanings, and example words/phrases
- Persistent browser-based spaced repetition with **Again / Hard / Good / Easy** scheduling
- A daily-study entry point designed around a short, focused session
- Practical Mandarin sentence drills with audio
- Hidden-text listening quizzes
- Sentence production practice from English to Chinese
- Four-tone demonstrations plus tone-identification quizzes
- Useful situation packs such as introductions, restaurant, transport, shopping, emergencies, work, internet/phone, and learning Chinese
- Adaptive pinyin mode so familiar cards can be practiced without romanization
- Progress dashboard for streak, core mastery, listening accuracy, tone accuracy, production attempts, and characters explored
- Exportable local progress JSON
- ElevenLabs Text-to-Speech on Vercel, with automatic browser Speech Synthesis fallback
- Responsive, dependency-free HTML/CSS/JavaScript

## Progress storage

Study progress is currently stored in `localStorage` under the stable key `mandarin-fast-track-v2`. Normal code deployments do not wipe it. This means progress persists between sessions on the same browser/device. Exportable progress JSON provides an additional manual backup. A future cloud-sync version can move this state to a database/user account while preserving the same SRS history.

## Run locally

The frontend has no build step. You can serve the repository with any static HTTP server. When the Vercel `/api/speech` function is unavailable locally, pronunciation automatically falls back to the browser's Mandarin speech-synthesis voice.

## Deploy on Vercel

Import this GitHub repository into Vercel. The frontend requires no build command. The `api/speech.js` file is deployed as a Vercel Function.

For higher-quality Mandarin pronunciation, add these Vercel Environment Variables:

- `ELEVENLABS_API_KEY` — your ElevenLabs API key
- `ELEVENLABS_VOICE_ID` — the Voice ID copied from ElevenLabs My Voices
- `ELEVENLABS_MODEL_ID` — optional; defaults to `eleven_multilingual_v2`

In ElevenLabs, choose a voice you like in My Voices, open its More actions menu, and copy the Voice ID. Add the variables in Vercel Project Settings → Environment Variables and redeploy the project.

Never put the ElevenLabs API key into `app.js`, `audio.js`, GitHub, or other browser-visible code. If ElevenLabs is missing, temporarily unavailable, or returns an error, the app automatically falls back to the device's browser Mandarin voice.

Once Git integration is enabled, pushes to the production branch can automatically create new deployments.

## Content quality roadmap

The 1,000+ bank is useful for recognition/exploration, while the richer SRS cards currently cover the smaller curated core deck. The next major content upgrade is to turn the bank into a rigorously frequency-ranked **Core 1000** where every entry has validated pinyin (including alternate readings where relevant), meaning, common vocabulary, useful example sentences, and learning metadata.

Other strong future upgrades include tone-sandhi lessons, handwriting/stroke order, richer sentence levels, cloud sync, and optional speech-recognition feedback.
