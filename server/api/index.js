import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import noteRoutes from "./routes/note.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";





dotenv.config();

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Connected to MongoDB !");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB !", err);
  });

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors()); // Use the imported cors directly

app.listen(3000, () => {
  console.log("Server is listening on port 3000 !");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/note", noteRoutes);


//middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
