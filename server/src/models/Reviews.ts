import mongoose, { Document, Schema } from "mongoose";

interface IReviews extends Document {
  rating: number;
  user: mongoose.Types.ObjectId;
  comment: string;
  images: string[];
  likes: mongoose.Types.ObjectId[];
  productId: mongoose.Types.ObjectId;
}

const reviewsSchema = new Schema<IReviews>(
  {
    rating: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comment: { type: String, required: true },
    images: { type: [String], default: [] },
    likes: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Reviews = mongoose.model<IReviews>("Reviews", reviewsSchema);

export default Reviews;
export { IReviews };
