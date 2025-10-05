// routes/matchesRoute.js
import express from "express";
import Match from "../models/matchModel.js";

const router = express.Router();

// ---------------- CRUD ROUTES ----------------

// ✅ CREATE Match (video URL only)
router.post("/create", async (req, res) => {
  try {
    const { title, description, video } = req.body; // video is a URL (e.g., Cloudinary link)

    const newMatch = new Match({
      title,
      description,
      video, // store the URL
    });

    await newMatch.save();
    res.status(201).json({
      message: "Match created successfully",
      match: newMatch,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET All Matches
router.get("/", async (req, res) => {
  try {
    const matches = await Match.find().sort({ createdAt: -1 });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET Single Match
router.get("/:id", async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ message: "Match not found" });
    res.json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ UPDATE Match (video URL can be replaced)
router.put("/update/:id", async (req, res) => {
  try {
    const { title, description, video } = req.body;

    const updatedMatch = await Match.findByIdAndUpdate(
      req.params.id,
      { title, description, video },
      { new: true }
    );

    if (!updatedMatch) return res.status(404).json({ message: "Match not found" });

    res.json({
      message: "Match updated successfully",
      match: updatedMatch,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ DELETE Match
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedMatch = await Match.findByIdAndDelete(req.params.id);
    if (!deletedMatch) return res.status(404).json({ message: "Match not found" });

    res.json({ message: "Match deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
