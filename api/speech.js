const MAX_TEXT_LENGTH = 800;

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const key = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION;
  const voice = process.env.AZURE_SPEECH_VOICE || 'zh-CN-XiaoxiaoNeural';

  if (!key || !region) {
    return res.status(503).json({ error: 'Azure Speech is not configured' });
  }

  const text = String(req.body?.text || '').trim();
  if (!text) return res.status(400).json({ error: 'Missing text' });
  if (text.length > MAX_TEXT_LENGTH) {
    return res.status(413).json({ error: `Text must be ${MAX_TEXT_LENGTH} characters or fewer` });
  }

  const ssml = `<?xml version="1.0" encoding="UTF-8"?>\n<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="zh-CN"><voice name="${escapeXml(voice)}"><prosody rate="-8%">${escapeXml(text)}</prosody></voice></speak>`;

  try {
    const azureResponse = await fetch(
      `https://${encodeURIComponent(region)}.tts.speech.microsoft.com/cognitiveservices/v1`,
      {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': key,
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
          'User-Agent': 'mandarin-fast-track'
        },
        body: ssml
      }
    );

    if (!azureResponse.ok) {
      const details = await azureResponse.text();
      console.error('Azure Speech error:', azureResponse.status, details);
      return res.status(502).json({ error: 'Speech generation failed' });
    }

    const audio = Buffer.from(await azureResponse.arrayBuffer());
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400');
    return res.status(200).send(audio);
  } catch (error) {
    console.error('Speech endpoint error:', error);
    return res.status(500).json({ error: 'Speech service unavailable' });
  }
}
