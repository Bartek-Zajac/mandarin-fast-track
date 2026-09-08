// Small UI enhancements kept separate from the core study dataset.
// app.js defines `core`, `queue`, and `speak` in the shared page scope.

const speakExampleButton = document.getElementById('speakExample');

if (speakExampleButton) {
  speakExampleButton.addEventListener('click', () => {
    const currentCard = core[queue[0]];
    const exampleChinese = currentCard?.[3];
    if (exampleChinese) speak(exampleChinese);
  });
}
