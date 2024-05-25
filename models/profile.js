const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who received the income
    age: { type: Number, required: true }, // Age of the user
    currentWeight: { type: Number }, //users current weight
    currentCalories: { type: Number }, //users current calories for the day
    currentProtein: { type: Number }, //users current protein for the day
    currentFat: { type: Number }, //users current fat for the day
    currentCarb: { type: Number }, //users current carbs for the day
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);
