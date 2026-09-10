// core-curated.js reorders the deck by true frequency after legacy SRS migration.
// Rebuild the queue immediately so its numeric view indices match the new deck order.
if (typeof buildStudyQueue === 'function') buildStudyQueue();
if (typeof renderToday === 'function') renderToday();
