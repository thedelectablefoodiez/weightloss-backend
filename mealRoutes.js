const express = require("express");
const router = express.Router();
const Meal = require("../models/Meal");
const { protect } = require("../middleware/authMiddleware");

// Get all meals for user
router.get("/", protect, async (req, res) => {
  const meals = await Meal.find({ user: req.user._id });
  res.json(meals);
});

// Add meal
router.post("/", protect, async (req, res) => {
  const { name, date } = req.body;
  const meal = await Meal.create({
    user: req.user._id,
    name,
    date: date || Date.now(),
  });
  res.status(201).json(meal);
});

// Delete meal
router.delete("/:id", protect, async (req, res) => {
  const meal = await Meal.findById(req.params.id);
  if (!meal) return res.status(404).json({ message: "Meal not found" });
  if (meal.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  await meal.remove();
  res.json({ message: "Meal removed" });
});

module.exports = router;
