function drawFortune() {

  const fortunes = [
    "🌟大吉",
    "🎉中吉",
    "😊小吉",
    "✨吉",
    "⚠️末吉",
    "😱凶"
  ];

  const result =
    fortunes[Math.floor(Math.random() * fortunes.length)];

  document.getElementById("fortune").textContent = result;
}
