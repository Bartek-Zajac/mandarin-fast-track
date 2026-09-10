# Mandarin Fast Track

A lightweight Mandarin learning app focused on useful Chinese: high-frequency characters, practical words and sentences, tones, listening, production, and adaptive review.

## Current features

- Generated **Core 1000 frequency dataset** based on HanziDB / Jun Da ordering
- Learning deck now rebuilt in true Core-1000 frequency order while preserving SRS history by character ID
- Up to four common HSK vocabulary examples per Core 1000 character when available
- Human-reviewed learner layer for the **top 100 characters**, including important secondary readings, clearer learner-facing senses, and bespoke practical sentences
- 1,000+ unique Chinese character bank for recognition/exploration
- Persistent browser-based spaced repetition with **Again / Hard / Good / Easy** scheduling
- Daily queue that deliberately mixes due reviews with new material instead of endlessly cycling old cards
- Eight-new-card daily target, with reviews interleaved roughly 2:1 with new cards
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

Study progress is stored in `localStorage` under the stable key `mandarin-fast-track-v2`.

The SRS state uses stable character IDs such as `char:我` instead of depending on array positions. Existing numeric-index progress is automatically migrated to the stable-ID schema, and the previous stored JSON is copied to `mandarin-fast-track-v2-backup` before replacement. This means future Core dataset additions, editorial changes, or reordering can be made without silently attaching old learning history to the wrong character.

Normal GitHub/Vercel deployments do not wipe progress. Progress is still browser/device-local, so clearing site data or switching devices can lose it; use **Export progress JSON** as an additional manual backup until account/cloud sync is added.

## Core 1000 data

`core1000-data.js` is generated reproducibly by `scripts/build_core1000.py`.

The build combines:

- **HanziDB.csv / Jun Da frequency list** for the top-1,000 simplified-character ordering, pinyin and concise character definitions.
- **complete-hsk-vocabulary** for common HSK words, their pinyin and meanings.

The generator selects up to four vocabulary items containing each character, preferring lower HSK levels and higher-frequency words. This generated layer is intentionally treated as scaffolding rather than unquestionable learner content.

`core-curated.js` is the human-reviewed editorial layer. It currently improves the highest-frequency 100 characters with clearer practical meanings, important alternate/neutral-tone readings, tone-change notes where useful, and short Mandarin sentences designed to be useful in real conversation. The study UI marks these cards as `reviewed`, displays secondary readings separately, and uses the curated sentence as the audio/example target.

The learning deck is rebuilt from the generated Core 1000 in frequency order only after legacy progress has been migrated. Because progress is keyed by the character itself rather than array position, this does not reset learned cards.

The GitHub Actions workflow `.github/workflows/build-core1000.yml` can rebuild the generated dataset from its open sources. Human curation remains separate so a generated refresh cannot overwrite editorial improvements.

### Content-quality note

The full 1,000-character frequency foundation and common-word metadata are present. The top 100 now have a first human-reviewed learner pass. Characters 101–1000 still rely more heavily on generated dictionary/HSK scaffolding and should continue receiving the same manual treatment over time, especially for polyphonic characters, neutral-tone forms, misleading dictionary-first senses, and examples that are technically valid but not especially useful to a learner.

This distinction is deliberate: generated data is excellent for coverage, but the app should label and preserve the difference between machine-assembled reference material and language content that has received an editorial learner-focused pass.

## Run locally

The frontend has no build step. You can serve the repository with any static HTTP server. When the Vercel `/api/speech` function is unavailable locally, pronunciation automatically falls back to the browser's Mandarin speech-synthesis voice.

## Deploy on Vercel

Import this GitHub repository into Vercel. The frontend requires no build command. The `api/speech.js` file is deployed as a Vercel Function.

For higher-quality Mandarin pronunciation, add these Vercel Environment Variables:

- `ELEVENLABS_API_KEY` — your ElevenLabs API key
- `ELEVENLABS_VOICE_ID` — the Voice ID copied from ElevenLabs My Voices
- `ELEVENLABS_MODEL_ID` — optional; defaults to `eleven_multilingual_v2`

Never put the ElevenLabs API key into browser-visible code or GitHub. If ElevenLabs is missing, unavailable, out of quota, or rejects the selected voice, the app automatically falls back to the device's browser Mandarin voice.

## Data attribution

The generated Core 1000 uses open-source data from `ruddfawcett/hanziDB.csv` and `drkameleon/complete-hsk-vocabulary`. Their source repositories and licenses should be reviewed when redistributing derivative datasets. The build script records the exact upstream URLs so the dataset remains reproducible and auditable.

## Next improvements

Continue the manual Core 1000 review in frequency-priority tranches, then add tone-sandhi lessons, handwriting/stroke order, richer sentence levels, cloud sync, and optional speech-recognition feedback.
