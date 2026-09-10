# Mandarin Fast Track

A lightweight Mandarin learning app focused on useful Chinese: high-frequency characters, practical words and sentences, tones, listening, production, and adaptive review.

## Current features

- Generated **Core 1000 frequency dataset** based on HanziDB / Jun Da ordering
- Learning deck in true Core-1000 frequency order while preserving SRS history by character ID
- Up to four common HSK vocabulary examples per Core 1000 character when available
- Hand-reviewed learner layer for the highest-frequency 100 characters
- Full-Core editorial enrichment layer: practical sentence matching, learner-facing senses, and additional high-value polyphonic readings across the remaining Core 1000
- 1,000+ unique Chinese character bank for recognition/exploration
- Persistent browser-based spaced repetition with **Again / Hard / Good / Easy** scheduling
- Daily queue mixing due reviews with up to eight new cards
- Practical sentence, listening, production, tone and situational drills
- Adaptive pinyin and progress dashboard
- Exportable local progress JSON

## Progress storage

Study progress is stored in `localStorage` under the stable key `mandarin-fast-track-v2`. SRS cards use stable IDs such as `char:我`; older numeric-index progress is automatically migrated and backed up first. Dataset additions, editorial changes and frequency reordering therefore do not reset learned cards.

Progress remains browser/device-local. Clearing site data or changing devices can lose it, so **Export progress JSON** remains the manual backup until cloud sync is added.

## Core 1000 data and editorial layers

`core1000-data.js` is generated reproducibly by `scripts/build_core1000.py`. It combines HanziDB / Jun Da frequency ordering with structured HSK vocabulary examples from `complete-hsk-vocabulary`.

`core-curated.js` contains the highest-confidence hand-reviewed learner material for the top-frequency characters: important readings, clearer senses, tone/neutral-tone notes where relevant, and bespoke practical sentences.

`core1000-editorial.js` extends learner-focused treatment across the entire Core 1000. It preserves those hand-reviewed overrides, adds explicit alternate readings for many important polyphonic characters, replaces a set of misleading dictionary-first senses with practical learner descriptions, and matches characters to a reviewed bank of natural everyday Mandarin sentences. Where no safe natural sentence in that bank contains a character, the app deliberately falls back to a sourced HSK vocabulary item rather than fabricating a sentence merely to claim complete bespoke coverage.

This distinction matters: all 1,000 cards now receive learner-oriented enrichment, but the app does **not** claim that every one of 1,000 entries has independently undergone expert linguistic proofreading. The top-frequency hand-reviewed layer remains the highest-confidence material, while lower-frequency entries use conservative sourced fallbacks when necessary.

The generated layer and editorial layers are separate, so rebuilding the frequency dataset cannot overwrite learner-focused improvements.

## Run and deploy

The frontend has no build step. Serve the repository with any static HTTP server. On Vercel, `api/speech.js` is deployed as a Function. Pronunciation uses the configured cloud TTS when available and automatically falls back to the browser Mandarin voice when it is not.

## Data attribution

The generated Core 1000 uses open-source data from `ruddfawcett/hanziDB.csv` and `drkameleon/complete-hsk-vocabulary`. The build script records the upstream URLs so the generated dataset remains reproducible and auditable.

## Quality philosophy

Frequency gets a character into the curriculum; usefulness determines how it should be taught. Prefer natural modern Mandarin, common words, meaningful alternate readings and memorable context over obscure dictionary senses. When confidence is insufficient, retain a sourced vocabulary example rather than inventing linguistic detail.
