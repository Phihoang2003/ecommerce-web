import mongoose, { Document, Schema } from "mongoose";

interface ICartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  followings: mongoose.Types.ObjectId[];
  followers: mongoose.Types.ObjectId[];
  cart: ICartItem[];
  isAdmin: boolean;
  address?: string;
  address_detail?: string;
  mobile?: string;
  avatar_url?: string;
  passwordChangedAt?: Date;
  confirm: boolean;
  verificationEmailToken?: string;
  passwordResetToken?: string;
  totalProduct: number;
  passwordTokenExpires?: Date;
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    followings: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
      },
    ],
    isAdmin: { type: Boolean, default: false },
    address: { type: String },
    address_detail: { type: String },
    mobile: { type: String },
    avatar_url: { type: String },
    passwordChangedAt: { type: Date },
    confirm: { type: Boolean, default: false },
    verificationEmailToken: { type: String },
    passwordResetToken: { type: String },
    totalProduct: { type: Number, default: 0 },
    passwordTokenExpires: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Add indexes for performance
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ verificationEmailToken: 1 });
userSchema.index({ passwordResetToken: 1 });

const User = mongoose.model<IUser>("User", userSchema);

export default User;
export { IUser, ICartItem };
