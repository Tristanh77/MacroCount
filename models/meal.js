const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who created the expense
    category: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner", "Snack"],
      required: true,
    },
    caloriesPerServing: { type: Number, required: true },
    numberOfServings: { type: Number, required: true },
    servingMacros: {
      servingProtein: { type: Number }, //meal's protein per serving
      servingFat: { type: Number }, //meal's fat per serving
      servingCarb: { type: Number }, //meal's carbs per serving
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Meal", mealSchema);
