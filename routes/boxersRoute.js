// routes/boxersRoute.js
import express from "express";
import Boxer from "../models/boxersModel.js";

const router = express.Router();

// ✅ Test route
router.get("/msg", (req, res) => {
  res.json({ message: "Hello world" });
});

// ✅ CREATE boxer (now accepts image link instead of file upload)
router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      winningMatches,
      lostMatches,
      draw,
      kaos,
      photo, // <-- now comes as a link
      instagram,
      facebook,
      twitter,
    } = req.body;

    const newBoxer = new Boxer({
      name,
      description,
      winningMatches: winningMatches || 0,
      lostMatches: lostMatches || 0,
      draw: draw || 0,
      kaos: kaos || 0,
      photo, // <-- just store the link
      socialMedia: { instagram, facebook, twitter },
    });

    await newBoxer.save();
    res.status(201).json({ message: "Boxer created successfully", boxer: newBoxer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET all boxers
router.get("/", async (req, res) => {
  try {
    const boxers = await Boxer.find();
    res.json(boxers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ UPDATE boxer
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      winningMatches,
      lostMatches,
      draw,
      kaos,
      photo, // still a link
      instagram,
      facebook,
      twitter,
    } = req.body;

    const updateData = {
      name,
      description,
      winningMatches,
      lostMatches,
      draw,
      kaos,
      photo, // keep or change the link
      socialMedia: { instagram, facebook, twitter },
    };

    const updatedBoxer = await Boxer.findByIdAndUpdate(id, updateData, { new: true });
    res.json({ message: "Boxer updated successfully", boxer: updatedBoxer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ DELETE boxer
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Boxer.findByIdAndDelete(id);
    res.json({ message: "Boxer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
