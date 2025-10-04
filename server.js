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
import adminRoute from "./routes/adminRoute.js";
import boxersRoute from "./routes/boxersRoute.js";
import newsRoute from "./routes/newsRoute.js";
import eventsRoute from "./routes/eventsRoute.js";
import postRoute from "./routes/postRoute.js";
import matchesRoute from "./routes/matchesRoute.js";

// newly added routes
import projectRoutes from "./routes/projectRoutes.js";
import judgeRoutes from "./routes/judgeRoutes.js";
import excomeRoutes from "./routes/excomeRoutes.js";
import clubRoutes from "./routes/clubRoutes.js";

// middlewares
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ DB connected successfully'))
  .catch((err) => console.error('❌ DB connection error:', err));

// route callings to server
app.use("/admin", adminRoute);
app.use("/boxers", boxersRoute);
app.use("/news", newsRoute);
app.use("/post", postRoute);
app.use("/events", eventsRoute);
app.use("/matches", matchesRoute);

// newly added route callings
app.use("/project", projectRoutes);
app.use("/judge", judgeRoutes);
app.use("/excome", excomeRoutes);
app.use("/club", clubRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
