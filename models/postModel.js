// models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, // we'll store image URL or path
      default: null,
    },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

const Post = mongoose.model("Post", postSchema);

export default Post;
