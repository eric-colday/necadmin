import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    img: { type: String, default: "/noavatar.png" },
    title: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 20,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
    },
    catSlug: {
      type: String,
    },
    cat: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
