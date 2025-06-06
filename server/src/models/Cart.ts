import mongoose, { Document, Schema } from "mongoose";

interface ICart extends Document {
  user: string;
  productId: mongoose.Schema.Types.ObjectId;
  shopId: string;
  quantity: number;
  totalPrice: number;
  image_url?: string;
}
const cartSchema = new Schema<ICart>(
  {
    user: { type: String, require: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    shopId: { type: String },
    quantity: { type: Number, default: 1 },
    totalPrice: { type: Number, require: true },
    image_url: { type: String },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model<ICart>("Cart", cartSchema);
export default Cart;
