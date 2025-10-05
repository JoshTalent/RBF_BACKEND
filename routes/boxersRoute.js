// routes/boxersRoute.js
import express from "express";
import Boxer from "../models/boxersModel.js";

const router = express.Router();

// ✅ Test route
router.get("/msg", (req, res) => {
  res.json({ message: "Boxer API working ✅" });
});

// ✅ CREATE a new boxer
router.post("/", async (req, res) => {
  try {
    const {
      name,
      image, // supports image URL
      record,
      wins,
      kos,
      losses,
      bio,
      manager,
      instagram,
      facebook,
      twitter,
    } = req.body;

    const newBoxer = new Boxer({
      name,
      image,
      record,
      wins: wins || 0,
      kos: kos || 0,
      losses: losses || 0,
      bio,
      manager: {
        name: manager?.name || "",
        email: manager?.email || "",
        phone: manager?.phone || "",
      },
      socialMedia: {
        instagram: instagram || "",
        facebook: facebook || "",
        twitter: twitter || "",
      },
    });

    await newBoxer.save();
    res.status(201).json({ message: "✅ Boxer created successfully", boxer: newBoxer });
  } catch (error) {
    console.error("Error creating boxer:", error);
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

// ✅ GET a single boxer by ID
router.get("/:id", async (req, res) => {
  try {
    const boxer = await Boxer.findById(req.params.id);
    if (!boxer) return res.status(404).json({ message: "Boxer not found" });
    res.json(boxer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ UPDATE boxer
router.put("/:id", async (req, res) => {
  try {
    const {
      name,
      image,
      record,
      wins,
      kos,
      losses,
      bio,
      manager,
      instagram,
      facebook,
      twitter,
    } = req.body;

    const updateData = {
      name,
      image,
      record,
      wins,
      kos,
      losses,
      bio,
      manager: {
        name: manager?.name || "",
        email: manager?.email || "",
        phone: manager?.phone || "",
      },
      socialMedia: {
        instagram: instagram || "",
        facebook: facebook || "",
        twitter: twitter || "",
      },
    };

    const updatedBoxer = await Boxer.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updatedBoxer)
      return res.status(404).json({ message: "Boxer not found" });

    res.json({ message: "✅ Boxer updated successfully", boxer: updatedBoxer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ DELETE boxer
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Boxer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Boxer not found" });

    res.json({ message: "🗑️ Boxer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
