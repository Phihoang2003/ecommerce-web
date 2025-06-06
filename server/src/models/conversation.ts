import mongoose, { Document, Schema } from "mongoose";

interface IMember {
  user: mongoose.Types.ObjectId;
  isWatched: boolean;
}

interface IConversation extends Document {
  members: IMember[];
}

const conversationSchema = new Schema<IConversation>(
  {
    members: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        isWatched: { type: Boolean, default: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model<IConversation>(
  "Conversation",
  conversationSchema
);

export default Conversation;
export { IConversation, IMember };
