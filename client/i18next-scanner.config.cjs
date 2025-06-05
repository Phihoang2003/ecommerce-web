module.exports = {
    input: [
        'src/**/*.{js,jsx,ts,tsx}', // Quét tất cả file JS/JSX/TS/TSX trong src
    ],
    output: './', // Thư mục lưu tệp bản dịch
    options: {
        debug: true, // Hiển thị log chi tiết
        lngs: ['en', 'vi'], // Ngôn ngữ: tiếng Anh, tiếng Việt
        defaultLng: 'en',
        resource: {
            loadPath: 'src/locales/{{lng}}/translation.json', // Đường dẫn tệp bản dịch
            savePath: 'src/locales/{{lng}}/translation.json', // Nơi lưu tệp
            jsonIndent: 2,
        },
        removeUnusedKeys: true, // Xóa key không dùng
        sort: true, // Sắp xếp key
    },
};
