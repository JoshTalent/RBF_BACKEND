import mongoose from "mongoose";

const BoxingClubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  coach: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  achievements: {
    type: String,
  },
  founded: {
    type: Number,
  },
  members: {
    type: Number,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  socials: {
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
  },
}, { timestamps: true });

export default mongoose.model("club", BoxingClubSchema);
