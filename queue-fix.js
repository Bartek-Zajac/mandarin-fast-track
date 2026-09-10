// Keep the study queue in sync when new Core cards are appended after app.js initializes.
// This preserves all existing SRS/localStorage data and only adds missing card indices to the live queue.
const reorderQueueBeforeCoreSync = reorderQueue;

reorderQueue = function reorderQueueWithAllCoreCards() {
  const present = new Set(queue);
  for (let index = 0; index < core.length; index += 1) {
    if (!present.has(index)) queue.push(index);
  }
  reorderQueueBeforeCoreSync();
};

// core-extra.js runs after app.js, so app.js's original queue only knew about the old deck.
// Sync immediately so newly appended characters can appear without resetting saved progress.
reorderQueue();
