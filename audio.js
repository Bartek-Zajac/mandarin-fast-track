// Mandarin audio layer: prefer Azure Neural TTS, fall back to browser speech synthesis.
// This file intentionally does not touch learning progress or localStorage.

const browserSpeakFallback = speak;
const speechAudioCache = new Map();
let activeSpeechAudio = null;

async function fetchNeuralSpeech(text) {
  if (speechAudioCache.has(text)) return speechAudioCache.get(text);

  const response = await fetch('/api/speech', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });

  if (!response.ok) {
    throw new Error(`Neural speech unavailable (${response.status})`);
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  speechAudioCache.set(text, url);

  // Avoid unbounded in-memory caching during long study sessions.
  if (speechAudioCache.size > 120) {
    const oldestKey = speechAudioCache.keys().next().value;
    const oldestUrl = speechAudioCache.get(oldestKey);
    URL.revokeObjectURL(oldestUrl);
    speechAudioCache.delete(oldestKey);
  }

  return url;
}

async function neuralSpeak(text) {
  const cleanText = String(text || '').trim();
  if (!cleanText) return;

  try {
    const url = await fetchNeuralSpeech(cleanText);
    if (activeSpeechAudio) {
      activeSpeechAudio.pause();
      activeSpeechAudio.currentTime = 0;
    }
    activeSpeechAudio = new Audio(url);
    await activeSpeechAudio.play();
  } catch (error) {
    console.warn('Azure neural voice unavailable; using browser Mandarin voice.', error);
    browserSpeakFallback(cleanText);
  }
}

// Replace the app-wide speech function while preserving the original as fallback.
speak = neuralSpeak;
