import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
const app = express();

// file config
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// routes

import adminRoute from "./routes/adminRoute.js"; // ✅ correct ES import
import boxersRoute from "./routes/boxersRoute.js"; // ✅ correct ES import
import newsRoute from "./routes/newsRoute.js"; // ✅ correct ES import
import eventsRoute from "./routes/eventsRoute.js"; // ✅ correct ES import
import postRoute from "./routes/postRoute.js"; // ✅ correct ES import
import matchesRoute from "./routes/matchesRoute.js"; // ✅ correct ES import

// middlewares
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// database connection


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      ssl: true,                     // Force SSL
      tlsAllowInvalidCertificates: true, // Helps on Windows local dev
    });
    console.log("✅ MongoDB connected dghrgjdkfnjksbvhbs hrt");
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
};

connectDB()
// route callings to server
app.use("/admin", adminRoute);
app.use("/boxers", boxersRoute);
app.use("/news", newsRoute);
app.use("/post", postRoute);
app.use("/events", eventsRoute);
app.use("/matches", matchesRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
