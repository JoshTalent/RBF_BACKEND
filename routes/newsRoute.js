import express from "express";
import News from "../models/newsModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Create uploads/news folder if not exist
const uploadsDir = path.join(process.cwd(), "uploads", "news");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer setup for video uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// Filter to accept only video files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["video/mp4", "video/mpeg", "video/avi","video/mpg", "video/mov"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed!"), false);
  }
};

const upload = multer({ storage: storage, fileFilter });

// ✅ CREATE News
router.post("/", upload.single("video"), async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const video = req.file ? `/uploads/news/${req.file.filename}` : null;

    const newNews = new News({ title, description, date, video });
    await newNews.save();

    res.status(201).json({ message: "News created successfully", news: newNews });
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

// ✅ UPDATE News
router.put("/update/:id", upload.single("video"), async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const updateData = { title, description, date };

    if (req.file) {
      updateData.video = `/uploads/news/${req.file.filename}`;
    }

    const updatedNews = await News.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ message: "News updated successfully", news: updatedNews });
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
