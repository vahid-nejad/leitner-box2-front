export function playPronounciation(questionText: string) {
  if (!questionText) return;
  var audio = new Audio(
    `http://ssl.gstatic.com/dictionary/static/sounds/oxford/${questionText.trim()}--_us_1.mp3`
  );

  if (
    audio.canPlayType("audio/mp3") === "probably" ||
    audio.canPlayType("audio/mp3") === "maybe"
  ) {
    audio.play();
  }
}
