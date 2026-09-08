// Keep the Today banner truthful without changing or resetting saved SRS data.
// This file intentionally leaves STORAGE_KEY and the existing study state untouched.

function renderTodayFixed() {
  const now = Date.now();
  const due = core.filter((_, i) => study.cards[i] && dueTimestamp(cardState(i)) <= now).length;
  const unseen = core.filter((_, i) => !study.cards[i]).length;
  const newToday = Math.min(8, unseen);
  const reviewToday = Math.min(24, due);
  const summary = document.getElementById('todaySummary');
  const streakLabel = document.getElementById('streakLabel');
  const startButton = document.getElementById('startDaily');

  if (!summary || !streakLabel) return;

  if (reviewToday === 0 && newToday === 0) {
    summary.textContent = '✓ Scheduled cards complete for today';
    if (startButton) startButton.textContent = 'Practice anyway →';
  } else {
    const estimatedMinutes = Math.max(5, Math.min(20, Math.round(reviewToday * 0.45 + newToday * 1.1 + 3)));
    summary.textContent = `${reviewToday} review${reviewToday === 1 ? '' : 's'} + ${newToday} new item${newToday === 1 ? '' : 's'} · ~${estimatedMinutes} minutes`;
    if (startButton) startButton.textContent = 'Start today’s lesson →';
  }

  const streak = study.streak.count;
  streakLabel.textContent = streak
    ? `${streak}-day study streak · listening + tones included`
    : 'Start today to build your streak.';
}

// Replace the old banner renderer so later saveState() calls use the corrected logic too.
window.renderToday = renderTodayFixed;
renderTodayFixed();
