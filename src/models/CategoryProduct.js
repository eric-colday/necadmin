import mongoose from "mongoose";

const { Schema } = mongoose;

const categoryProductSchema = new Schema(
  {
    slug: {type: String},
    title: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 20,
    },
    image: { type: String, default: "/noavatar.png" },
    posts: { type: Array },
  },
  { timestamps: true }
);

export default mongoose.models.CategoryProduct || mongoose.model("CategoryProduct", categoryProductSchema);
