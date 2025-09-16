const express = require("express");
const router = express.Router();
const Weight = require("../models/Weight");
const { protect } = require("../middleware/authMiddleware");

// Get weight history
router.get("/", protect, async (req, res) => {
  const weights = await Weight.find({ user: req.user._id }).sort({ date: 1 });
  res.json(weights);
});

// Add weight
router.post("/", protect, async (req, res) => {
  const { weight, date } = req.body;
  const newWeight = await Weight.create({
    user: req.user._id,
    weight,
    date: date || Date.now(),
  });
  res.status(201).json(newWeight);
});

module.exports = router;
