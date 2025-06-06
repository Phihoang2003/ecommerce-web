import mongoose, { Document, Schema } from "mongoose";

interface ICategory extends Document {
  category: string;
  category_code: string;
  category_image: string;
  category_slug: string;
}

const categorySchema = new Schema<ICategory>(
  {
    category: { type: String, required: true },
    category_code: { type: String, required: true },
    category_image: { type: String, required: true },
    category_slug: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
export { ICategory };
