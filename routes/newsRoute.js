// routes/newsRoute.js
import express from "express";
import News from "../models/newsModel.js";

const router = express.Router();

// ✅ CREATE News (accepts video link instead of file upload)
router.post("/", async (req, res) => {
  try {
    const { title, description, date, video } = req.body; // video is just a URL/link

    const newNews = new News({
      title,
      description,
      date,
      video, // e.g. Cloudinary, YouTube, or other hosted video URL
    });

    await newNews.save();
    res.status(201).json({
      message: "News created successfully",
      news: newNews,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET all news
router.get("/", async (req, res) => {
  try {
    const newsList = await News.find().sort({ createdAt: -1 });
    res.json(newsList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET single news by ID
router.get("/:id", async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) return res.status(404).json({ message: "News not found" });
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ UPDATE News (video can be replaced with new link)
router.put("/update/:id", async (req, res) => {
  try {
    const { title, description, date, video } = req.body;

    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      { title, description, date, video },
      { new: true }
    );

    if (!updatedNews) return res.status(404).json({ message: "News not found" });
    res.json({
      message: "News updated successfully",
      news: updatedNews,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ DELETE News
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await News.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "News not found" });
    res.json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
