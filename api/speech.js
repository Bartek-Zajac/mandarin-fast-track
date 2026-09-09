const MAX_TEXT_LENGTH = 800;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;
  const modelId = process.env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2';

  if (!apiKey || !voiceId) {
    return res.status(503).json({ error: 'ElevenLabs speech is not configured' });
  }

  const text = String(req.body?.text || '').trim();
  if (!text) return res.status(400).json({ error: 'Missing text' });
  if (text.length > MAX_TEXT_LENGTH) {
    return res.status(413).json({ error: `Text must be ${MAX_TEXT_LENGTH} characters or fewer` });
  }

  try {
    const elevenResponse = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=mp3_44100_128`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg'
        },
        body: JSON.stringify({
          text,
          model_id: modelId,
          voice_settings: {
            stability: 0.55,
            similarity_boost: 0.75,
            style: 0,
            use_speaker_boost: true,
            speed: 0.92
          }
        })
      }
    );

    if (!elevenResponse.ok) {
      const details = await elevenResponse.text();
      console.error('ElevenLabs Speech error:', elevenResponse.status, details);
      return res.status(502).json({ error: 'Speech generation failed' });
    }

    const audio = Buffer.from(await elevenResponse.arrayBuffer());
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400');
    return res.status(200).send(audio);
  } catch (error) {
    console.error('Speech endpoint error:', error);
    return res.status(500).json({ error: 'Speech service unavailable' });
  }
}
