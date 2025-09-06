// routes/boxersRoute.js
import express from "express";
import Boxer from "../models/boxersModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import authorizeAdmin from "../middlewares/authentication.js";

const router = express.Router();

// Create uploads/boxers folder if it doesn't exist
const uploadsDir = path.join(process.cwd(), "uploads", "boxers");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
 
// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });



// ✅ CREATE boxer
router.post("/", authorizeAdmin , upload.single("photo"), async (req, res) => {
  try {
    const {
      name,
      description,
      winningMatches,
      lostMatches,
      draw,
      kaos,
      instagram,
      facebook,
      twitter,
    } = req.body;
    const photo = req.file ? `/uploads/boxers/${req.file.filename}` : null;

    const newBoxer = new Boxer({
      name,
      description,
      winningMatches: winningMatches || 0,
      lostMatches: lostMatches || 0,
      draw: draw || 0,
      kaos: kaos || 0,
      photo,
      socialMedia: { instagram, facebook, twitter },
    });

    await newBoxer.save();
    res
      .status(201)
      .json({ message: "Boxer created successfully", boxer: newBoxer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET all boxers
router.get("/",authorizeAdmin, async (req, res) => {
  try {
    const boxers = await Boxer.find();
    res.json(boxers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ UPDATE boxer
router.put("/update/:id",authorizeAdmin , upload.single("photo"), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      updateData.photo = `/uploads/boxers/${req.file.filename}`;
    }

    const updatedBoxer = await Boxer.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.json({ message: "Boxer updated", boxer: updatedBoxer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ DELETE boxer
router.delete("/:id",authorizeAdmin ,  async (req, res) => {
  try {
    const { id } = req.params;
    await Boxer.findByIdAndDelete(id);
    res.json({ message: "Boxer deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
