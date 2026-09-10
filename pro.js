const STORAGE_KEY = 'mandarin-fast-track-v2';
const BACKUP_KEY = `${STORAGE_KEY}-backup`;
const SCHEMA_VERSION = 3;
const DAY = 24 * 60 * 60 * 1000;
const DAILY_NEW_LIMIT = 8;
const DAILY_REVIEW_LIMIT = 32;

const defaultState = () => ({
  schemaVersion: SCHEMA_VERSION,
  cards: {},
  streak: { lastDay: null, count: 0 },
  listening: { correct: 0, total: 0 },
  tones: { correct: 0, total: 0 },
  production: 0,
  explored: [],
  dailyStarts: 0,
  dailyNew: { date: null, count: 0 }
});

const defaultCard = () => ({ reps: 0, interval: 0, ease: 2.5, due: 0, lapses: 0, last: null });
const cardId = index => core[index]?.[0] ? `char:${core[index][0]}` : `index:${index}`;

function mergeCard(a, b) {
  if (!a) return { ...defaultCard(), ...b };
  if (!b) return { ...defaultCard(), ...a };
  const score = card => (card.reps || 0) * 1000000 + (card.interval || 0) * 1000 + (card.last || 0) / 1e12;
  return score(b) >= score(a) ? { ...defaultCard(), ...b } : { ...defaultCard(), ...a };
}

function migrateState(saved) {
  const base = defaultState();
  const nextCards = {};
  Object.entries(saved?.cards || {}).forEach(([key, value]) => {
    let stableKey = key;
    if (/^\d+$/.test(key)) {
      const legacyIndex = Number(key);
      stableKey = core[legacyIndex]?.[0] ? `char:${core[legacyIndex][0]}` : `legacy-index:${key}`;
    } else if (/^[\u3400-\u9fff]$/.test(key)) {
      stableKey = `char:${key}`;
    }
    nextCards[stableKey] = mergeCard(nextCards[stableKey], value);
  });

  return {
    ...base,
    ...(saved || {}),
    schemaVersion: SCHEMA_VERSION,
    cards: nextCards,
    streak: { ...base.streak, ...(saved?.streak || {}) },
    listening: { ...base.listening, ...(saved?.listening || {}) },
    tones: { ...base.tones, ...(saved?.tones || {}) },
    dailyNew: { ...base.dailyNew, ...(saved?.dailyNew || {}) },
    explored: Array.isArray(saved?.explored) ? saved.explored : []
  };
}

function parseStored(raw) {
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function loadState() {
  const primary = parseStored(localStorage.getItem(STORAGE_KEY));
  const backup = parseStored(localStorage.getItem(BACKUP_KEY));
  return migrateState(primary || backup || defaultState());
}

let study = loadState();
let listeningIndex = 0;
let listeningAnswered = false;
let productionIndex = 0;
let currentTone = 1;
let toneAnswered = false;

const todayKey = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const daysBetween = (a, b) => Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / DAY);

function ensureDailyNewCounter() {
  const today = todayKey();
  if (study.dailyNew.date !== today) study.dailyNew = { date: today, count: 0 };
}

function saveState() {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) localStorage.setItem(BACKUP_KEY, existing);
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
  return study.cards[cardId(index)] || defaultCard();
}

function hasSeen(index) {
  return Boolean(study.cards[cardId(index)]);
}

function dueTimestamp(card) {
  return Number(card.due || 0);
}

function buildStudyQueue() {
  ensureDailyNewCounter();
  const now = Date.now();
  const due = core.map((_, i) => i)
    .filter(i => hasSeen(i) && dueTimestamp(cardState(i)) <= now)
    .sort((a, b) => dueTimestamp(cardState(a)) - dueTimestamp(cardState(b)))
    .slice(0, DAILY_REVIEW_LIMIT);

  const remainingNew = Math.max(0, DAILY_NEW_LIMIT - study.dailyNew.count);
  const unseen = core.map((_, i) => i).filter(i => !hasSeen(i)).slice(0, remainingNew);

  const mixed = [];
  let r = 0, n = 0;
  while (r < due.length || n < unseen.length) {
    for (let k = 0; k < 2 && r < due.length; k += 1) mixed.push(due[r++]);
    if (n < unseen.length) mixed.push(unseen[n++]);
  }

  // Keep the Learn screen useful even after today's scheduled work is complete.
  if (!mixed.length) {
    const nextUnseen = core.findIndex((_, i) => !hasSeen(i));
    if (nextUnseen >= 0) mixed.push(nextUnseen);
    else {
      const soonest = core.map((_, i) => i).sort((a, b) => dueTimestamp(cardState(a)) - dueTimestamp(cardState(b)))[0];
      if (Number.isInteger(soonest)) mixed.push(soonest);
    }
  }

  queue.splice(0, queue.length, ...mixed);
  renderCharacter();
  applyPinyinMode();
}

function reorderQueue() {
  buildStudyQueue();
}

function scheduleCurrent(rating) {
  const index = queue[0];
  if (!Number.isInteger(index)) return;
  const wasNew = !hasSeen(index);
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
  study.cards[cardId(index)] = next;
  if (wasNew) {
    ensureDailyNewCounter();
    study.dailyNew.count += 1;
  }
  touchStudyDay();

  if (rating === 'again') needsReview += 1;
  else mastered += 1;
  updateStats();
  saveState();
  buildStudyQueue();
}

function matureCount() {
  return Object.entries(study.cards).filter(([key, card]) => key.startsWith('char:') && card.reps >= 3 && card.interval >= 7).length;
}

function applyPinyinMode() {
  const box = document.getElementById('autoPinyin');
  const pinyin = document.getElementById('pinyin');
  if (!box || !pinyin || !queue.length) return;
  if (box.checked) {
    pinyin.classList.remove('soft-hidden');
    return;
  }
  pinyin.classList.toggle('soft-hidden', cardState(queue[0]).reps >= 2);
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
  ensureDailyNewCounter();
  const now = Date.now();
  const due = core.filter((_, i) => hasSeen(i) && dueTimestamp(cardState(i)) <= now).length;
  const unseen = core.filter((_, i) => !hasSeen(i)).length;
  const newToday = Math.min(Math.max(0, DAILY_NEW_LIMIT - study.dailyNew.count), unseen);
  const reviewToday = Math.min(DAILY_REVIEW_LIMIT, due);
  const summary = document.getElementById('todaySummary');
  const streakLabel = document.getElementById('streakLabel');
  const startButton = document.getElementById('startDaily');
  if (!summary || !streakLabel) return;

  if (reviewToday === 0 && newToday === 0) {
    summary.textContent = '✓ Scheduled cards complete for today';
    if (startButton) startButton.textContent = 'Practice anyway →';
  } else {
    const estimatedMinutes = Math.max(5, Math.min(25, Math.round(reviewToday * 0.45 + newToday * 1.1 + 3)));
    summary.textContent = `${reviewToday} review${reviewToday === 1 ? '' : 's'} + ${newToday} new item${newToday === 1 ? '' : 's'} · ~${estimatedMinutes} minutes`;
    if (startButton) startButton.textContent = 'Start today’s lesson →';
  }
  const streak = study.streak.count;
  streakLabel.textContent = streak ? `${streak}-day study streak · reviews + new material` : 'Start today to build your streak.';
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

document.getElementById('legacyRatings').hidden = true;
document.querySelectorAll('.rating').forEach(button => button.addEventListener('click', () => scheduleCurrent(button.dataset.rating)));
document.getElementById('autoPinyin').addEventListener('change', applyPinyinMode);
document.getElementById('speakExample').addEventListener('click', () => queue.length && speak(core[queue[0]][3]));

document.getElementById('startDaily').addEventListener('click', () => {
  study.dailyStarts += 1;
  touchStudyDay();
  saveState();
  buildStudyQueue();
  activateView('learn');
  document.getElementById('learn').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.getElementById('playListening').addEventListener('click', () => speak(sentences[listeningIndex][0]));
document.getElementById('nextListening').addEventListener('click', renderListening);
document.getElementById('revealProduction').addEventListener('click', () => {
  const answer = document.getElementById('productionAnswer');
  if (!answer.hidden) return;
  answer.hidden = false;
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

// Persist the migrated stable-ID schema immediately. The old raw state is retained as a backup first.
saveState();
buildStudyQueue();
renderListening();
renderProduction();
renderPacks();
newToneQuestion();
renderProgress();
