const STORAGE_KEY = 'mandarin-fast-track-v2';
const DAY = 24 * 60 * 60 * 1000;

const defaultState = () => ({
  cards: {},
  streak: { lastDay: null, count: 0 },
  listening: { correct: 0, total: 0 },
  tones: { correct: 0, total: 0 },
  production: 0,
  explored: [],
  dailyStarts: 0
});

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...defaultState(), ...(saved || {}), cards: saved?.cards || {}, streak: { ...defaultState().streak, ...(saved?.streak || {}) }, listening: { ...defaultState().listening, ...(saved?.listening || {}) }, tones: { ...defaultState().tones, ...(saved?.tones || {}) }, explored: Array.isArray(saved?.explored) ? saved.explored : [] };
  } catch {
    return defaultState();
  }
}

let study = loadState();
let listeningIndex = 0;
let listeningAnswered = false;
let productionIndex = 0;
let currentTone = 1;
let toneAnswered = false;

const todayKey = () => new Date().toISOString().slice(0, 10);
const daysBetween = (a, b) => Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / DAY);

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(study));
  renderProgress();
  renderToday();
}

function touchStudyDay() {
  const today = todayKey();
  if (study.streak.lastDay === today) return;
  if (!study.streak.lastDay) study.streak.count = 1;
  else {
    const gap = daysBetween(study.streak.lastDay, today);
    study.streak.count = gap === 1 ? study.streak.count + 1 : 1;
  }
  study.streak.lastDay = today;
}

function cardState(index) {
  return study.cards[index] || { reps: 0, interval: 0, ease: 2.5, due: 0, lapses: 0, last: null };
}

function dueTimestamp(card) {
  return Number(card.due || 0);
}

function reorderQueue() {
  const now = Date.now();
  queue.sort((a, b) => {
    const ca = cardState(a), cb = cardState(b);
    const aDue = dueTimestamp(ca) <= now ? 0 : 1;
    const bDue = dueTimestamp(cb) <= now ? 0 : 1;
    if (aDue !== bDue) return aDue - bDue;
    if (ca.reps !== cb.reps) return ca.reps - cb.reps;
    return dueTimestamp(ca) - dueTimestamp(cb);
  });
  renderCharacter();
  applyPinyinMode();
}

function scheduleCurrent(rating) {
  const index = queue[0];
  const prev = cardState(index);
  const next = { ...prev };
  const now = Date.now();

  if (rating === 'again') {
    next.reps = 0;
    next.interval = 0.15;
    next.ease = Math.max(1.3, next.ease - 0.2);
    next.lapses += 1;
    next.due = now + 4 * 60 * 60 * 1000;
  } else if (rating === 'hard') {
    next.reps += 1;
    next.interval = Math.max(0.75, prev.interval ? prev.interval * 1.35 : 0.75);
    next.ease = Math.max(1.3, next.ease - 0.12);
    next.due = now + next.interval * DAY;
  } else if (rating === 'good') {
    next.reps += 1;
    next.interval = prev.reps === 0 ? 1 : prev.reps === 1 ? 3 : Math.max(3, prev.interval * next.ease);
    next.due = now + next.interval * DAY;
  } else {
    next.reps += 1;
    next.ease = Math.min(3.2, next.ease + 0.15);
    next.interval = prev.reps === 0 ? 3 : Math.max(5, prev.interval * next.ease * 1.25);
    next.due = now + next.interval * DAY;
  }

  next.last = now;
  study.cards[index] = next;
  touchStudyDay();
  saveState();
  advance(rating === 'again');
  reorderQueue();
}

function matureCount() {
  return Object.values(study.cards).filter(card => card.reps >= 3 && card.interval >= 7).length;
}

function applyPinyinMode() {
  const box = document.getElementById('autoPinyin');
  const pinyin = document.getElementById('pinyin');
  if (!box || !pinyin || !queue.length) return;
  if (box.checked) {
    pinyin.classList.remove('soft-hidden');
    return;
  }
  const card = cardState(queue[0]);
  pinyin.classList.toggle('soft-hidden', card.reps >= 2);
}

function activateView(name) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.toggle('active', tab.dataset.view === name));
  document.querySelectorAll('.view').forEach(view => {
    const active = view.id === name;
    view.hidden = !active;
    view.classList.toggle('active-view', active);
  });
}

function renderToday() {
  const now = Date.now();
  const due = core.filter((_, i) => study.cards[i] && dueTimestamp(cardState(i)) <= now).length;
  const unseen = core.filter((_, i) => !study.cards[i]).length;
  const newToday = Math.min(8, unseen);
  const reviewToday = Math.min(24, due);
  document.getElementById('todaySummary').textContent = `${reviewToday} reviews + ${newToday} new items · about 20 minutes`;
  const streak = study.streak.count;
  document.getElementById('streakLabel').textContent = streak ? `${streak}-day study streak · listening + tones included` : 'Start today to build your streak.';
}

function shuffled(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function renderListening() {
  listeningAnswered = false;
  listeningIndex = Math.floor(Math.random() * sentences.length);
  const correct = sentences[listeningIndex][0];
  const distractors = shuffled(sentences.map((s, i) => ({ text: s[0], i })).filter(x => x.i !== listeningIndex)).slice(0, 2).map(x => x.text);
  const options = shuffled([correct, ...distractors]);
  const host = document.getElementById('listeningChoices');
  host.replaceChildren();
  options.forEach(text => {
    const button = document.createElement('button');
    button.className = 'choice';
    button.textContent = text;
    button.addEventListener('click', () => answerListening(button, text === correct));
    host.appendChild(button);
  });
  document.getElementById('listeningFeedback').textContent = 'Listen first. The Chinese text is hidden until you choose.';
  document.getElementById('listenScore').textContent = `${study.listening.correct}/${study.listening.total}`;
}

function answerListening(button, correct) {
  if (listeningAnswered) return;
  listeningAnswered = true;
  study.listening.total += 1;
  if (correct) study.listening.correct += 1;
  touchStudyDay();
  document.querySelectorAll('#listeningChoices .choice').forEach(b => b.disabled = true);
  button.classList.add(correct ? 'correct' : 'wrong');
  const [cn, py, en] = sentences[listeningIndex];
  document.getElementById('listeningFeedback').textContent = correct ? `Correct — ${py} · ${en}` : `Answer: ${cn} — ${py} · ${en}`;
  document.getElementById('listenScore').textContent = `${study.listening.correct}/${study.listening.total}`;
  saveState();
}

function renderProduction() {
  productionIndex = Math.floor(Math.random() * sentences.length);
  const [cn, py, en] = sentences[productionIndex];
  document.getElementById('productionEnglish').textContent = en;
  document.getElementById('productionChinese').textContent = cn;
  document.getElementById('productionPinyin').textContent = py;
  document.getElementById('productionAnswer').hidden = true;
  document.getElementById('productionScore').textContent = `${study.production} practiced`;
}

const toneSet = [
  { tone: 1, char: '妈', py: 'mā', label: '1st tone — high and level' },
  { tone: 2, char: '麻', py: 'má', label: '2nd tone — rising' },
  { tone: 3, char: '马', py: 'mǎ', label: '3rd tone — low/dipping' },
  { tone: 4, char: '骂', py: 'mà', label: '4th tone — falling' }
];

function newToneQuestion() {
  currentTone = 1 + Math.floor(Math.random() * 4);
  toneAnswered = false;
  document.getElementById('toneFeedback').textContent = 'Play the syllable, then choose 1–4.';
  document.querySelectorAll('[data-tone-answer]').forEach(b => { b.disabled = false; b.classList.remove('correct', 'wrong'); });
}

function answerTone(button, guess) {
  if (toneAnswered) return;
  toneAnswered = true;
  study.tones.total += 1;
  const correct = guess === currentTone;
  if (correct) study.tones.correct += 1;
  touchStudyDay();
  const item = toneSet[currentTone - 1];
  button.classList.add(correct ? 'correct' : 'wrong');
  document.getElementById('toneFeedback').textContent = `${correct ? 'Correct' : 'Not quite'} — ${item.char} ${item.py}: ${item.label}.`;
  document.getElementById('toneScore').textContent = `${study.tones.correct}/${study.tones.total}`;
  saveState();
  setTimeout(newToneQuestion, 900);
}

const packs = [
  { name: 'Introductions', icon: '👋', ids: [0, 2, 28, 29] },
  { name: 'Restaurant', icon: '🥟', ids: [7, 8, 9, 10, 11, 12] },
  { name: 'Transport', icon: '🚆', ids: [19, 20, 21] },
  { name: 'Shopping', icon: '🛍️', ids: [7, 8, 9, 22] },
  { name: 'Help & emergencies', icon: '🆘', ids: [17, 18, 25, 26] },
  { name: 'Work & plans', icon: '💼', ids: [13, 14, 15, 27] },
  { name: 'Internet & phone', icon: '📱', ids: [23, 24] },
  { name: 'Learning Chinese', icon: '🀄', ids: [2, 3, 4, 5, 6, 29, 30] }
];

function renderPacks() {
  const grid = document.getElementById('packGrid');
  grid.replaceChildren();
  packs.forEach((pack, index) => {
    const button = document.createElement('button');
    button.className = 'pack-button';
    button.innerHTML = `<span>${pack.icon}</span><b>${pack.name}</b><small>${pack.ids.length} useful sentences</small>`;
    button.addEventListener('click', () => showPack(index));
    grid.appendChild(button);
  });
  showPack(0);
}

function showPack(index) {
  const host = document.getElementById('packSentences');
  host.replaceChildren();
  packs[index].ids.filter(i => sentences[i]).forEach(i => {
    const [cn, py, en] = sentences[i];
    const row = document.createElement('div');
    row.className = 'pack-row';
    row.innerHTML = `<div><b>${cn}</b><span>${py}</span><small>${en}</small></div><button class="ghost">🔊</button>`;
    row.querySelector('button').addEventListener('click', () => speak(cn));
    host.appendChild(row);
  });
}

function pct(correct, total) {
  return total ? `${Math.round(correct / total * 100)}%` : '—';
}

function renderProgress() {
  const mature = matureCount();
  const mastery = Math.round(mature / core.length * 100);
  document.getElementById('metricStreak').textContent = `${study.streak.count} day${study.streak.count === 1 ? '' : 's'}`;
  document.getElementById('metricMastery').textContent = `${mastery}%`;
  document.getElementById('metricMasteryDetail').textContent = `${mature} of ${core.length} detailed cards mature`;
  document.getElementById('metricListening').textContent = pct(study.listening.correct, study.listening.total);
  document.getElementById('metricTones').textContent = pct(study.tones.correct, study.tones.total);
  document.getElementById('metricProduction').textContent = study.production;
  document.getElementById('metricExplored').textContent = study.explored.length;
  document.getElementById('masteryBar').style.width = `${mastery}%`;
  document.getElementById('learningModeText').textContent = mastery < 20 ? 'Foundation mode: keep pinyin visible when needed, but always try the character first.' : mastery < 60 ? 'Transition mode: turn pinyin off for familiar cards and rely on characters + audio.' : 'Chinese-first mode: keep pinyin hidden most of the time and use it only to check uncertain pronunciation.';
}

// Replace the original binary review buttons with persistent four-grade SRS.
document.getElementById('legacyRatings').hidden = true;
document.querySelectorAll('.rating').forEach(button => button.addEventListener('click', () => scheduleCurrent(button.dataset.rating)));
document.getElementById('autoPinyin').addEventListener('change', applyPinyinMode);
document.getElementById('speakExample').addEventListener('click', () => speak(core[queue[0]][3]));

document.getElementById('startDaily').addEventListener('click', () => {
  study.dailyStarts += 1;
  touchStudyDay();
  saveState();
  reorderQueue();
  activateView('learn');
  document.getElementById('learn').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.getElementById('playListening').addEventListener('click', () => speak(sentences[listeningIndex][0]));
document.getElementById('nextListening').addEventListener('click', renderListening);
document.getElementById('revealProduction').addEventListener('click', () => {
  document.getElementById('productionAnswer').hidden = false;
  study.production += 1;
  touchStudyDay();
  document.getElementById('productionScore').textContent = `${study.production} practiced`;
  saveState();
});
document.getElementById('speakProduction').addEventListener('click', () => speak(sentences[productionIndex][0]));
document.getElementById('nextProduction').addEventListener('click', renderProduction);
document.getElementById('playToneQuiz').addEventListener('click', () => speak(toneSet[currentTone - 1].char));
document.querySelectorAll('[data-tone-answer]').forEach(button => button.addEventListener('click', () => answerTone(button, Number(button.dataset.toneAnswer))));

document.getElementById('characterGrid').addEventListener('click', event => {
  const button = event.target.closest('.char-button');
  if (!button) return;
  const char = button.textContent;
  if (!study.explored.includes(char)) {
    study.explored.push(char);
    if (study.explored.length > 1200) study.explored = study.explored.slice(-1200);
    saveState();
  }
});

document.getElementById('resetToday').addEventListener('click', () => {
  mastered = 0;
  needsReview = 0;
  updateStats();
  document.getElementById('listeningFeedback').textContent = 'Session counters reset. Long-term spaced-repetition progress is preserved.';
});

document.getElementById('exportProgress').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(study, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `mandarin-fast-track-progress-${todayKey()}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

// Refresh adaptive pinyin after the original app changes cards.
['againButton', 'knowButton'].forEach(id => document.getElementById(id)?.addEventListener('click', applyPinyinMode));

reorderQueue();
renderToday();
renderListening();
renderProduction();
renderPacks();
newToneQuestion();
renderProgress();
