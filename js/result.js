window.QRGameResult = {
  // Lưu trữ timeout id để clear nếu gọi lại show() nhiều lần liên tiếp
  _revealTimeout: null,

  show({ name, mode }) {
    const config = window.QRGameConfig[mode] || window.QRGameConfig.lose;
    const form = document.getElementById("playerForm");
    const panel = document.getElementById("resultPanel");
    const scratchArea = document.getElementById("scratchArea");
    const canvas = document.getElementById("scratchCanvas");
    const card = document.getElementById("scratchResultCard");
    const messageElement = document.getElementById("resultMessage");

    // Xóa timeout cũ nếu có
    if (this._revealTimeout) {
      clearTimeout(this._revealTimeout);
      this._revealTimeout = null;
    }

    // 1. Cập nhật dữ liệu
    document.getElementById("resultEmoji").textContent = config.emoji;
const titleElement = document.getElementById("resultTitle");
const playerName = name.toLocaleUpperCase("vi-VN");
const titleParts = config.title.split("{name}");

titleElement.replaceChildren(
  document.createTextNode(titleParts[0]),
  Object.assign(document.createElement("span"), {
    className: "player-name-highlight",
    textContent: playerName
  }),
  document.createTextNode(titleParts[1] || "")
);

    const messageGroups = window.QRLuckyMessages || {};
    const messages = Array.isArray(messageGroups[mode]) ? messageGroups[mode] : [];
    const message = messages.length
      ? messages[Math.floor(Math.random() * messages.length)]
      : config.message;

    messageElement.textContent = message;
    messageElement.classList.remove("typing-message");
    document.getElementById("prizeNote").textContent = config.note;

    // 2. Cập nhật trạng thái class & hiển thị DOM
    panel.classList.remove("is-win", "is-lose", "reveal");
    panel.classList.add(mode === "win" ? "is-win" : "is-lose");

    card.classList.remove("scratch-card-win", "scratch-card-lose");
    card.classList.add(mode === "win" ? "scratch-card-win" : "scratch-card-lose");

    scratchArea.classList.remove("scratch-revealed", "scratch-complete");

    panel.hidden = false;
    scratchArea.hidden = false;
    canvas.hidden = false;
    form.hidden = true;

    // 3. Khởi tạo scratch card
    if (window.QRScratchCard && canvas) {
      window.QRScratchCard.init({
        canvas,
        mode,
        onReveal: () => {
          scratchArea.classList.add("scratch-revealed");

          // Kích hoạt lại animation typing mượt mà không dùng offsetWidth
          messageElement.classList.remove("typing-message");
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              messageElement.classList.add("typing-message");
            });
          });

          this._revealTimeout = window.setTimeout(() => {
            canvas.hidden = true;
            scratchArea.classList.remove("scratch-revealed");
            scratchArea.classList.add("scratch-complete");
          }, 350);
        }
      });
    }

    // 4. Kích hoạt hiệu ứng xuất hiện (reveal animation) & confetti
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.classList.add("reveal");

        if (config.confetti && window.QRGameConfetti) {
          window.QRGameConfetti.launch();
        }

        panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    });
  }
};