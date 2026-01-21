import express from "express";
import Blog from "../models/blog.js";

const router = express.Router();

/* CREATE */
router.post("/", async (req, res) => {
  try {
    const { title, body, author } = req.body;

    if (!title || !body) {
      return res.status(400).json({ error: "Title and body are required" });
    }

    const blog = await Blog.create({ title, body, author });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

/* READ ALL */
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch {
    res.status(500).json({ error: "Database error" });
  }
});

/* READ ONE */
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Not found" });
    res.json(blog);
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
});

/* UPDATE */
router.put("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!blog) return res.status(404).json({ error: "Not found" });
    res.json(blog);
  } catch {
    res.status(400).json({ error: "Invalid request" });
  }
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Blog deleted" });
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
});

export default router;
