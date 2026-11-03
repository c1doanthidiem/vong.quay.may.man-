/*
 * Cấu hình nội dung hiển thị.
 * index.html dùng data-result="win"; truot.html dùng data-result="lose".
 * Đây chỉ là bản giao diện tĩnh, chưa xác thực giải thưởng ở máy chủ.
 */
window.QRGameConfig = {
  win: {
    emoji: "🎉",
    title: "CHÚC MỪNG {name}!",
    message: "Bạn đã may mắn nhận được một phần quà đặc biệt!",
    note: "Vui lòng liên hệ Ban tổ chức để xác nhận và nhận quà.",
    confetti: true
  },
  lose: {
    emoji: "🍀",
    title: "CẢM ƠN {name} ĐÃ THAM GIA!",
    message: "May mắn có thể chưa ghé thăm hôm nay, nhưng mong những điều tốt đẹp sẽ luôn đồng hành cùng bạn!",
    note: "Cảm ơn bạn đã góp thêm niềm vui cho chương trình.",
    confetti: false
  }
};
