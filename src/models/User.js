import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dzer4ijr1/image/upload/v1703108635/users/noavatar_xckjxl.png",
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 20,
    },
    fullname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true, max: 1024, minlength: 6 },
    phone: {
      type: String,
      //required: true,
    },
    address: {
      type: String,
      //required: true,
    },
    gender: {
      type: String,
      //required: true,
    },
    active: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
);

//If the User collection does not exist create a new one.
export default mongoose.models.User || mongoose.model("User", userSchema);
