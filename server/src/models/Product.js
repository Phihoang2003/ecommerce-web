const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    image_url: { type: String, require: true },
    images: { type: Array, default: [], require: true },
    title: { type: String, require: true },
    brand: { type: String, require: true },
    brand_slug: { type: String, require: true },
    slug: {
      type: String,
      require: true,
      lowercase: true,
    },
    star: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    userBought: { type: Array, default: [] },
    old_price: { type: Number, default: 0 },
    new_price: { type: Number, default: 0 },
    in_stock: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    category_code: { type: String, default: "", require: true },
    category_name: { type: String, default: "", require: true },
    infoProduct: [
      {
        name: String,
        value: String,
      },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    views: { type: Number, default: 0 }, // số lượng người truy cập
    description: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

// Thêm chỉ mục cho các trường thường xuyên truy vấn
productSchema.index({ title: "text" }); // Chỉ mục text cho tìm kiếm regex trên title
productSchema.index({ category_code: 1 }); // Chỉ mục đơn cho category_code
productSchema.index({ createdAt: -1 }); // Chỉ mục cho sắp xếp theo createdAt (giảm dần)

// Thêm các chỉ mục bổ sung cho truy vấn hiệu quả
productSchema.index({ brand: 1 });
productSchema.index({ brand_slug: 1 });
productSchema.index({ user: 1 });
productSchema.index({ new_price: 1 });
productSchema.index({ slug: 1 }, { unique: true });

// Chỉ mục kết hợp cho các truy vấn phổ biến
productSchema.index({ category_code: 1, new_price: 1 });
productSchema.index({ category_code: 1, createdAt: -1 });
productSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("Product", productSchema);
