const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goalSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who received the income
    calorieGoal: { type: Number }, // users daily calorie goal
    proteinGoal: { type: Number }, // users daily protein goal
    fatGoal: { type: Number }, //users daily fat goal
    carbGoal: { type: Number }, //users daily carb goal
    weightGoal: { type: Number }, //users weight goal
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
