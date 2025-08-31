// models/Match.js
import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    video: { type: String, default: null }, // video URL or path
  },
  { timestamps: true }
);

const Match = mongoose.model("Match", matchSchema);

export default Match;
