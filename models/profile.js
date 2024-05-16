const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who received the income
    // image: { type: String }, // Image of the user, if we need it or an Avatar
    // firstName: { type: String, required: true }, // First name of the user, if needed, will have to delete from "User" model
    // lastName: { type: String, required: true }, // Last name of the user, if needed, will have to delete from "User" model
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
