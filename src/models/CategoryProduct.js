import mongoose from "mongoose";

const { Schema } = mongoose;

const categoryProductSchema = new Schema(
  {
    slug: { type: String },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } 
);

export default mongoose.models.CategoryProduct ||
  mongoose.model("CategoryProduct", categoryProductSchema);
