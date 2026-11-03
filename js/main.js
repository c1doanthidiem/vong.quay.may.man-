
(function initQRGame() {
  const form = document.getElementById("playerForm");
  const nameInput = document.getElementById("playerName");
  const errorBox = document.getElementById("formError");
  const mode = document.body.dataset.result === "win" ? "win" : "lose";
  const button = document.getElementById("openButton");

  if (!form || !nameInput || !errorBox || !button) return;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const validation = window.QRGameForm.validateName(nameInput.value);

    if (!validation.valid) {
      errorBox.textContent = validation.message;
      nameInput.focus();
      return;
    }

    errorBox.textContent = "";

    // Khóa nút trong lúc chờ
    button.disabled = true;
    button.textContent = "🎁 Đang mở quà...";

    // Hiển thị thông báo hồi hộp
    let loadingMessage = document.getElementById("loadingMessage");

    if (!loadingMessage) {
      loadingMessage = document.createElement("p");
      loadingMessage.id = "loadingMessage";
      loadingMessage.setAttribute("aria-live", "polite");
      loadingMessage.style.marginTop = "14px";
      loadingMessage.style.color = "#1261A0";
      loadingMessage.style.fontWeight = "600";
      button.insertAdjacentElement("afterend", loadingMessage);
    }

    loadingMessage.textContent = "🍀 Một chút hồi hộp... May mắn đang đến!";

    // Chờ 3 giây
    await new Promise(resolve => setTimeout(resolve, 3000));

    loadingMessage.remove();

    // Hiển thị kết quả như logic cũ
    window.QRGameResult.show({
      name: validation.name,
      mode
    });
  });
})();
