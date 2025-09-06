import express from "express";
import Post from "../models/postModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import authorizeAdmin from "../middlewares/authentication.js";

const router = express.Router();

// Create uploads/posts folder if not exist
const uploadsDir = path.join(process.cwd(), "uploads", "posts");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer setup
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
 
const upload = multer({ storage: storage });

// ---------------------- CRUD ROUTES ----------------------

// Create Post
router.post("/",authorizeAdmin ,  upload.single("image"), async (req, res) => {
  try {
    // console.log("File received:", req.file);
    // console.log("Body received:", req.body);

    const { title, description } = req.body;
    const image = req.file ? `/uploads/posts/${req.file.filename}` : null;

    const newPost = new Post({ title, description, image });
    await newPost.save();

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Posts
router.get("/",authorizeAdmin ,  async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Single Post
router.get("/:id",authorizeAdmin ,  async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Post
router.put("/:id",authorizeAdmin ,  upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedData = { title, description };

    if (req.file) {
      updatedData.image = `/uploads/posts/${req.file.filename}`;
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    if (!updatedPost) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Post
router.delete("/:id",authorizeAdmin ,  async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: "Post not found" });

    // Delete image from uploads folder
    if (deletedPost.image) {
      const imagePath = path.join(process.cwd(), deletedPost.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
