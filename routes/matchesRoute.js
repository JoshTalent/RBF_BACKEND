// routes/matchesRoute.js
import express from "express";
import Match from "../models/matchesModel.js"; // ES module import
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Create uploads/matches folder if it doesn't exist
const uploadsDir = path.join(process.cwd(), "uploads", "matches");
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
const upload = multer({ storage });

// ---------------- CRUD ROUTES ----------------

// CREATE Match
router.post("/create", upload.single("video"), async (req, res) => {
  try {
    console.log("File received:", req.file);
    console.log("Body received:", req.body);

    const { title, description } = req.body;
    const video = req.file ? `/uploads/matches/${req.file.filename}` : null;

    const newMatch = new Match({ title, description, video });
    await newMatch.save();

    res.status(201).json({ message: "Match created successfully", match: newMatch });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET All Matches
router.get("/", async (req, res) => {
  try {
    const matches = await Match.find().sort({ createdAt: -1 });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET Single Match
router.get("/:id", async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ message: "Match not found" });
    res.json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE Match
router.put("/update/:id", upload.single("video"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedData = { title, description };

    if (req.file) {
      updatedData.video = `/uploads/matches/${req.file.filename}`;
    }

    const updatedMatch = await Match.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedMatch) return res.status(404).json({ message: "Match not found" });

    res.json({ message: "Match updated successfully", match: updatedMatch });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE Match
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedMatch = await Match.findByIdAndDelete(req.params.id);
    if (!deletedMatch) return res.status(404).json({ message: "Match not found" });

    // Delete video file from uploads
    if (deletedMatch.video) {
      const videoPath = path.join(process.cwd(), deletedMatch.video);
      if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
    }

    res.json({ message: "Match deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
