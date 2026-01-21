import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(() => console.log("DB connection error"));

app.use("/blogs", blogRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
