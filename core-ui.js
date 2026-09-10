// Enrich the study-card renderer with Core 1000 metadata and human curation.
// core-curated.js may load after pro.js; this renderer reads metadata live each time.
const renderCharacterBase = renderCharacter;

renderCharacter = function renderCharacterWithCore1000() {
  renderCharacterBase();
  if (!queue.length) return;

  const index = queue[0];
  const [hanzi, , , exampleText, exampleInfo] = core[index];
  const meta = globalThis.core1000ByChar?.[hanzi];
  if (!meta) return;

  const rankLabel = document.getElementById('rankLabel');
  if (rankLabel) rankLabel.textContent = `Frequency #${meta.rank} · Core 1000${meta.curated ? ' · reviewed' : ''}`;

  const pinyin = document.getElementById('pinyin');
  if (pinyin && meta.pinyin) pinyin.textContent = meta.pinyin;

  const meaning = document.getElementById('meaning');
  if (meaning && meta.meaning) meaning.textContent = meta.meaning;

  const host = document.getElementById('example');
  if (!host) return;
  host.replaceChildren();

  const sentenceLabel = document.createElement('small');
  sentenceLabel.className = 'core-section-label';
  sentenceLabel.textContent = meta.sentence ? 'Useful sentence' : 'Useful example';
  host.appendChild(sentenceLabel);

  const primary = document.createElement('div');
  primary.textContent = meta.sentence?.[0] || exampleText;
  host.appendChild(primary);

  const primaryInfo = document.createElement('small');
  primaryInfo.textContent = meta.sentence ? `${meta.sentence[1]} · ${meta.sentence[2]}` : exampleInfo;
  host.appendChild(primaryInfo);

  if (meta.readings?.length > 1) {
    const readings = document.createElement('small');
    readings.className = 'core-reading-list';
    readings.textContent = `Readings: ${meta.readings.join(' · ')}`;
    host.appendChild(readings);
  }

  if (meta.words?.length) {
    const words = document.createElement('small');
    words.className = 'core-word-list';
    words.textContent = `Common words: ${meta.words.slice(0, 4).map(word => `${word.zh} (${word.pinyin}) — ${word.meaning}`).join(' · ')}`;
    host.appendChild(words);
  }
};
