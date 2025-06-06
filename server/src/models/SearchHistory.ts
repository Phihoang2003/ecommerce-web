import mongoose, { Document, Schema } from "mongoose";

interface ISearchHistory extends Document {
  text: string;
  user: string;
}

const searchHistorySchema = new Schema<ISearchHistory>(
  {
    text: { type: String, required: true, unique: true },
    user: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const SearchHistory = mongoose.model<ISearchHistory>(
  "SearchHistory",
  searchHistorySchema
);

export default SearchHistory;
export { ISearchHistory };
