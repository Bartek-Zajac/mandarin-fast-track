// Enrich the existing study-card renderer with generated Core 1000 metadata.
// Loaded after core1000-data.js and before pro.js.
const renderCharacterBase = renderCharacter;

renderCharacter = function renderCharacterWithCore1000() {
  renderCharacterBase();
  if (!queue.length) return;

  const index = queue[0];
  const [hanzi, , , exampleWord, exampleInfo] = core[index];
  const meta = globalThis.core1000ByChar?.[hanzi];
  if (!meta) return;

  const rankLabel = document.getElementById('rankLabel');
  if (rankLabel) rankLabel.textContent = `Frequency #${meta.rank} · Core 1000`;

  const host = document.getElementById('example');
  if (!host) return;
  host.replaceChildren();

  const primary = document.createElement('div');
  primary.textContent = exampleWord;
  host.appendChild(primary);

  const primaryInfo = document.createElement('small');
  primaryInfo.textContent = exampleInfo;
  host.appendChild(primaryInfo);

  if (meta.words?.length) {
    const words = document.createElement('small');
    words.className = 'core-word-list';
    words.textContent = `Common words: ${meta.words.slice(0, 4).map(word => `${word.zh} (${word.pinyin}) — ${word.meaning}`).join(' · ')}`;
    host.appendChild(words);
  }
};
