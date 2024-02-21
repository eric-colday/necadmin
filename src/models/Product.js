import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: [String],
      default: "/noavatar.png",
    },
    slug: {
      type: String,
    },
    catSlug: {
      type: String,
    },
    cat: { type: String },
    size: { type: Array },
    color: { type: Array },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
