import mongoose from "mongoose";

const { Schema } = mongoose;

const categoryPostSchema = new Schema(
  {
    slug: { type: String },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.CategoryPost ||
  mongoose.model("CategoryPost", categoryPostSchema);
