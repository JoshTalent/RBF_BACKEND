import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    video: { type: String, default: null }, // store either YouTube link or direct video URL
  },
  { timestamps: true }
);

export default mongoose.model("Match", matchSchema);
