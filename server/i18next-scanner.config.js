module.exports = {
  input: [
    "src/**/*.{js,jsx,ts,tsx}", // Quét tất cả file JS/JSX/TS/TSX trong thư mục src
    // Nếu frontend ở thư mục khác, thêm vào đây, ví dụ: '../client/src/**/*.{js,jsx,ts,tsx}'
  ],
  output: "./", // Thư mục lưu tệp bản dịch
  options: {
    debug: true, // Hiển thị log chi tiết khi quét
    lngs: ["en", "vi"], // Các ngôn ngữ cần tạo bản dịch
    defaultLng: "en", // Ngôn ngữ mặc định
    resource: {
      loadPath: "src/locales/{{lng}}/translation.json", // Đường dẫn tệp bản dịch
      savePath: "src/locales/{{lng}}/translation.json", // Nơi lưu tệp bản dịch
      jsonIndent: 2, // Định dạng JSON
    },
    removeUnusedKeys: true, // Xóa các key không còn dùng
    sort: true, // Sắp xếp key theo thứ tự
  },
};
