const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// সব task দেখা
router.get("/", async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
});

// নতুন task তৈরি করা
router.post("/", async (req, res) => {
  try {
    const task = new Task({ title: req.body.title });
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// task complete/incomplete টগল করা
router.put("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  task.completed = !task.completed;
  await task.save();
  res.json(task);
});

// task ডিলিট করা
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;
