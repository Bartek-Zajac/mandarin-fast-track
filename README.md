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
- Mandarin pronunciation through the browser Speech Synthesis API
- Responsive, dependency-free HTML/CSS/JavaScript

## Progress storage

Study progress is currently stored in `localStorage` in the browser. That means it persists between sessions on the same browser/device, with no account or backend required. A future cloud-sync version can move this state to a database/user account while keeping the same learning model.

## Run locally

Because the app has no build step, you can open `index.html` directly or serve the directory with any static HTTP server.

## Deploy on Vercel

Import this GitHub repository into Vercel. It is a static site and requires no framework preset or build command. Vercel can serve the repository root directly.

Once Git integration is enabled, pushes to the production branch can automatically create new deployments.

## Content quality roadmap

The 1,000+ bank is useful for recognition/exploration, while the richer SRS cards currently cover the smaller curated core deck. The next major content upgrade is to turn the bank into a rigorously frequency-ranked **Core 1000** where every entry has validated pinyin (including alternate readings where relevant), meaning, common vocabulary, useful example sentences, and learning metadata.

Other strong future upgrades include native-recorded audio, tone-sandhi lessons, handwriting/stroke order, richer sentence levels, cloud sync, and optional speech-recognition feedback.
