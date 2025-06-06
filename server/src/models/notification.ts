import mongoose, { Document, Schema } from "mongoose";

interface INotification extends Document {
  user: string;
  shopId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  user_name: string;
  title: string;
  subtitle: string;
  image_url?: string;
  link?: string;
  is_watched: boolean;
}

const notificationSchema = new Schema<INotification>(
  {
    user: { type: String, required: true },
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    user_name: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    image_url: { type: String },
    link: { type: String },
    is_watched: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);

export default Notification;
export { INotification };
