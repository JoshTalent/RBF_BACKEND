import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ DB connected successfully"))
  .catch((err) => console.error("❌ DB connection error:", err));

// Routes
import adminRoute from "./routes/adminRoute.js";
import boxersRoute from "./routes/boxersRoute.js";
import newsRoute from "./routes/newsRoute.js";
import eventsRoute from "./routes/eventsRoute.js";
import postRoute from "./routes/postRoute.js";
import matchesRoute from "./routes/matchRoute.js";
import projectRoutes from "./routes/projectRoutes.js";
import judgeRoutes from "./routes/judgeRoutes.js";
import excomeRoutes from "./routes/excomeRoutes.js";
import clubRoutes from "./routes/clubRoutes.js";
import messageRoutes from "./routes/messageRoute.js"

// Route usage
app.use("/admin", adminRoute);
app.use("/boxers", boxersRoute);
app.use("/news", newsRoute);
app.use("/post", postRoute);
app.use("/events", eventsRoute);
app.use("/matches", matchesRoute);
app.use("/project", projectRoutes);
app.use("/judge", judgeRoutes);
app.use("/excome", excomeRoutes);
app.use("/club", clubRoutes);
app.use("/message", messageRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("✅ API running successfully. All media handled as URLs.");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
