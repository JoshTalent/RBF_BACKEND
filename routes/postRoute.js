// routes/postsRoute.js
import express from "express";
import Post from "../models/postModel.js";

const router = express.Router();

// ---------------------- CRUD ROUTES ----------------------

// ✅ Create Post (image URL only)
router.post("/", async (req, res) => {
  try {
    const { title, description, image } = req.body; // image = link from cloud service

    const newPost = new Post({ title, description, image });
    await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get All Posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get Single Post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update Post (update image URL if needed)
router.put("/:id", async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const updatedData = { title, description, image };

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    if (!updatedPost) return res.status(404).json({ message: "Post not found" });
    res.json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete Post
router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: "Post not found" });

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
