const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who received the income
    age: { type: Number, required: true }, // Age of the user
    currentWeight: { type: Number }, // User's current weight
    startingWeight: { type: Number }, // User's starting weight
    currentCalories: { type: Number, default: 0 }, // User's current calories for the day
    currentProtein: { type: Number, default: 0 }, // User's current protein for the day
    currentFat: { type: Number, default: 0 }, // User's current fat for the day
    currentCarb: { type: Number, default: 0 }, // User's current carbs for the day
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);
