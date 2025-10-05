import express from "express";
import News from "../models/newsModel.js";

const router = express.Router();

// ✅ CREATE News (uses videoUrl and thumbnail links)
router.post("/", async (req, res) => {
  try {
    const { title, thumbnail, videoUrl, description, date } = req.body;

    const newNews = new News({
      title,
      thumbnail,
      videoUrl,
      description,
      date: date || Date.now(),
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

// ✅ GET all News
router.get("/", async (req, res) => {
  try {
    const newsList = await News.find().sort({ createdAt: -1 });
    res.json(newsList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET single News by ID
router.get("/:id", async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) return res.status(404).json({ message: "News not found" });
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ UPDATE News (videoUrl and thumbnail can be updated)
router.put("/update/:id", async (req, res) => {
  try {
    const { title, thumbnail, videoUrl, description, date, views, likes } = req.body;

    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      { title, thumbnail, videoUrl, description, date, views, likes },
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
