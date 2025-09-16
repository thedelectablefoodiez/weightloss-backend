const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Meal", mealSchema);
