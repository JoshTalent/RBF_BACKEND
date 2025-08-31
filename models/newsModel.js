import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  description: { type: String, required: true, trim: true },
  video: { type: String, default: null },
}, { timestamps: true });

const News = mongoose.model("News", newsSchema);
export default News; // ✅ ES module
