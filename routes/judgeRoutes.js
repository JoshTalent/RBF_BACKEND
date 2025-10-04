import express from "express";
import Judge from "../models/judge.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const judge = new Judge(req.body);
    await judge.save();
    res.status(201).json(judge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ all
router.get("/", async (req, res) => {
  try {
    const judges = await Judge.find().sort({ createdAt: -1 });
    res.json(judges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ one
router.get("/:id", async (req, res) => {
  try {
    const judge = await Judge.findById(req.params.id);
    if (!judge) return res.status(404).json({ message: "Judge not found" });
    res.json(judge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const judge = await Judge.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!judge) return res.status(404).json({ message: "Judge not found" });
    res.json(judge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const judge = await Judge.findByIdAndDelete(req.params.id);
    if (!judge) return res.status(404).json({ message: "Judge not found" });
    res.json({ message: "Judge deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
