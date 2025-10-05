// models/Boxer.js
import mongoose from "mongoose";

const BoxerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, // Can store an external link (e.g., Imgur, Cloudinary) or local path
      default: "",
    },
    record: {
      type: String, // e.g., "20W - 2L - 1D"
      default: "",
    },
    wins: {
      type: Number,
      default: 0,
    },
    kos: {
      type: Number,
      default: 0,
    },
    losses: {
      type: Number,
      default: 0,
    },
    bio: {
      type: String,
      default: "",
    },
    manager: {
      name: {
        type: String,
        default: "",
      },
      email: {
        type: String,
        default: "",
      },
      phone: {
        type: String,
        default: "",
      },
    },
    socialMedia: {
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      twitter: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Boxer", BoxerSchema);
