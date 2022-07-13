export function playPronounciation(questionText: string) {
  if (!questionText) return;
  var audio = new Audio(
    `http://ssl.gstatic.com/dictionary/static/sounds/oxford/${questionText.trim()}--_us_1.mp3`
  );

  audio.play().catch((err) => console.log(err));
}
