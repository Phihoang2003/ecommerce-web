"use strict";
const mongoose = require("mongoose");

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    // Chỉ bật debug trong môi trường development
    if (process.env.NODE_ENV !== "production") {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    // Cấu hình mongoose cho hiệu suất tốt hơn
    const options = {
      maxPoolSize: 100, // Tăng kích thước pool kết nối
      minPoolSize: 10, // Duy trì ít nhất 10 kết nối
      socketTimeoutMS: 45000, // Timeout sau 45 giây
      serverSelectionTimeoutMS: 5000, // Thời gian chọn server
      family: 4, // IPv4, tránh vấn đề với IPv6
      keepAlive: true,
      keepAliveInitialDelay: 300000, // Keep-alive sau 5 phút
    };

    // Kết nối với MongoDB
    mongoose
      .connect(process.env.MONGODB_URL, options)
      .then(() => console.log("MongoDB connected successfully!"))
      .catch((err) => console.log("MongoDB connection failed:", err));
  }

  // Đảm bảo chỉ tạo một kết nối
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

// Thêm sự kiện để xử lý các vấn đề kết nối
mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected, attempting to reconnect...");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected successfully");
});

// Export
module.exports = Database;
