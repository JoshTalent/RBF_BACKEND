import express from "express";
import Excome from "../models/excome.js"; // adjust path if needed

const router = express.Router();

// ✅ CREATE a new excome member
router.post("/", async (req, res) => {
  try {
    const excome = new Excome(req.body);
    await excome.save();
    res.status(201).json(excome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ READ all excome members
router.get("/", async (req, res) => {
  try {
    const excomes = await Excome.find().sort({ createdAt: -1 });
    res.json(excomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ READ a single excome member by ID
router.get("/:id", async (req, res) => {
  try {
    const excome = await Excome.findById(req.params.id);
    if (!excome) return res.status(404).json({ message: "Excome member not found" });
    res.json(excome);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ UPDATE an excome member by ID
router.put("/:id", async (req, res) => {
  try {
    const excome = await Excome.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!excome) return res.status(404).json({ message: "Excome member not found" });
    res.json(excome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ DELETE an excome member by ID
router.delete("/:id", async (req, res) => {
  try {
    const excome = await Excome.findByIdAndDelete(req.params.id);
    if (!excome) return res.status(404).json({ message: "Excome member not found" });
    res.json({ message: "Excome member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
