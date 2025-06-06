import mongoose, { Document, Schema } from "mongoose";

interface IOrderProduct {
  id: mongoose.Types.ObjectId;
  quantity: number;
}

interface IShippingAddress {
  fullName: string;
  detailAddress: string;
  village: string;
  district: string;
  city: string;
  phone: number;
}

interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  products: IOrderProduct[];
  is_pay: boolean;
  totalPrice: number;
  paymentMethod: string;
  is_confirm: boolean;
  is_confirm_delivery: boolean;
  is_delivering: boolean;
  is_canceled: boolean;
  is_success: boolean;
  shopId: string;
  shippingAddress: IShippingAddress;
  shippingPrice: number;
  dateShipping?: string;
}

const orderSchema = new Schema<IOrder>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
      },
    ],
    is_pay: { type: Boolean, required: true, default: false },
    totalPrice: { type: Number, required: true, default: 0 },
    paymentMethod: { type: String, required: true },
    is_confirm: { type: Boolean, default: false },
    is_confirm_delivery: { type: Boolean, default: false },
    is_delivering: { type: Boolean, default: false },
    is_canceled: { type: Boolean, default: false },
    is_success: { type: Boolean, default: false },
    shopId: { type: String, required: true },
    shippingAddress: {
      fullName: { type: String, required: true },
      detailAddress: { type: String, required: true },
      village: { type: String, required: true },
      district: { type: String, required: true },
      city: { type: String, required: true },
      phone: { type: Number, required: true },
    },
    shippingPrice: { type: Number, required: true },
    dateShipping: { type: String },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
export { IOrder, IOrderProduct, IShippingAddress };
