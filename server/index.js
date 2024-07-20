import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import UserRoutes from "./routes/auth.route.js";
import UserPosts from './routes/post.route.js';
import path from "path";

dotenv.config();

mongoose.connect(process.env.MongoDB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to MongoDB: ${process.env.MongoDB_URL}`))
  .catch((error) => console.error("Mongoose connection error:", error));

const app = express();
const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "*"
}));
app.use(cookieParser());

// Serve frontend assets
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// API routes
app.use("/api/auth", UserRoutes);
app.use("/api/post", UserPosts);

// Catch-all route for frontend SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
