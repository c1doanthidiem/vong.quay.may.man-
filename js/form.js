window.QRGameForm = {
  normalizeName(value) {
    return String(value || "").trim().replace(/\s+/g, " ");
  },
  validateName(value) {
    const name = this.normalizeName(value);
    if (!name) return { valid: false, name, message: "Vui lòng nhập họ và tên trước khi mở quà." };
    if (name.length < 2) return { valid: false, name, message: "Vui lòng nhập họ tên đầy đủ hơn." };
    return { valid: true, name, message: "" };
  }
};
