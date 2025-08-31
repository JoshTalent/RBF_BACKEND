// models/Boxer.js
import mongoose from "mongoose";

const boxerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    photo: { type: String, default: null }, // URL/path
    description: { type: String, trim: true },
    winningMatches: { type: Number, default: 0 },
    lostMatches: { type: Number, default: 0 },
    draw: { type: Number, default: 0 },
    kaos: { type: Number, default: 0 },
    socialMedia: {
      instagram: { type: String, default: null },
      facebook: { type: String, default: null },
      twitter: { type: String, default: null },
    },
  },
  { timestamps: true }
);
 
const Boxer = mongoose.model("Boxer", boxerSchema);

export default Boxer;
