import mongoose, { Document, Schema } from "mongoose";

interface IProductInfo {
  name: string;
  value: string;
}

interface IProduct extends Document {
  image_url: string;
  images: string[];
  title: string;
  brand: string;
  brand_slug: string;
  slug: string;
  star: number;
  sold: number;
  userBought: string[];
  old_price: number;
  new_price: number;
  in_stock: number;
  discount: number;
  category_code: string;
  category_name: string;
  infoProduct: IProductInfo[];
  user: mongoose.Types.ObjectId;
  views: number;
  description: string;
}

const productSchema = new Schema<IProduct>(
  {
    image_url: { type: String, required: true },
    images: { type: [String], default: [], required: true },
    title: { type: String, required: true },
    brand: { type: String, required: true },
    brand_slug: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    star: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    userBought: { type: [String], default: [] },
    old_price: { type: Number, default: 0 },
    new_price: { type: Number, default: 0 },
    in_stock: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    category_code: { type: String, default: "", required: true },
    category_name: { type: String, default: "", required: true },
    infoProduct: [
      {
        name: String,
        value: String,
      },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    views: { type: Number, default: 0 },
    description: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ title: "text" });
productSchema.index({ category_code: 1 });
productSchema.index({ createdAt: -1 });

productSchema.index({ brand: 1 });
productSchema.index({ brand_slug: 1 });
productSchema.index({ user: 1 });
productSchema.index({ new_price: 1 });
productSchema.index({ slug: 1 }, { unique: true });

productSchema.index({ category_code: 1, new_price: 1 });
productSchema.index({ category_code: 1, createdAt: -1 });
productSchema.index({ user: 1, createdAt: -1 });

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
export { IProduct, IProductInfo };
