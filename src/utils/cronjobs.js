const cron = require("node-cron");
const Exercise = require("../../models/exercise"); // Make sure the path is correct

// Schedule a job to run at midnight every day
cron.schedule("0 0 * * *", async () => {
  try {
    await Exercise.updateMany({}, { $set: { caloriesburned: 0 } });
    console.log("Calories burned reset to zero for all records.");
  } catch (error) {
    console.error("Error resetting calories burned:", error);
  }
});

module.exports = cron;
