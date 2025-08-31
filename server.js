import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// File path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
import adminRoute from "./routes/adminRoute.js";
import boxersRoute from "./routes/boxersRoute.js";
import newsRoute from "./routes/newsRoute.js";
import eventsRoute from "./routes/eventsRoute.js";
import postRoute from "./routes/postRoute.js";
import matchesRoute from "./routes/matchesRoute.js";

// Connect to MongoDB and start server only if successful
const startServer = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      ssl: true,
      tlsAllowInvalidCertificates: true, // Windows local dev workaround
      serverSelectionTimeoutMS: 10000,   // timeout if cannot connect
    });

    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    // Only start server after DB connection
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    process.exit(1);
  }
};

// Initialize DB + server
startServer();

// Routes
app.use("/admin", adminRoute);
app.use("/boxers", boxersRoute);
app.use("/news", newsRoute);
app.use("/post", postRoute);
app.use("/events", eventsRoute);
app.use("/matches", matchesRoute);
