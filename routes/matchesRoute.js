import express from "express";
import Match from "../models/matchModel.js"; // make sure you have a Match schema
const router = express.Router();

// GET all matches
router.get("/", async (req, res) => {
  try {
    const matches = await Match.find().sort({ createdAt: -1 });
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

// CREATE new match
router.post("/create", async (req, res) => {
  try {
    const { title, description, video } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    // Validate video: must be either a URL or empty
    const newMatch = new Match({ title, description, video: video || null });
    const savedMatch = await newMatch.save();

    res.json({ match: savedMatch });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create match" });
  }
});

// UPDATE match
router.put("/update/:id", async (req, res) => {
  try {
    const { title, description, video } = req.body;

    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ error: "Match not found" });

    match.title = title || match.title;
    match.description = description || match.description;
    match.video = video || match.video;

    const updatedMatch = await match.save();
    res.json({ match: updatedMatch });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update match" });
  }
});

// DELETE match
router.delete("/delete/:id", async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ error: "Match not found" });

    await match.remove();
    res.json({ message: "Match deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete match" });
  }
});

export default router;
