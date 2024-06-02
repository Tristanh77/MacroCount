require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");

require("./config/database");
require("./src/utils/cronjobs");

const app = express();

app.use(logger("dev"));
app.use(express.json());

// Configure CORS
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:8000", "https://macro-count.vercel.app"], // Allow both local development and deployed domain
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Configure the auth middleware
app.use(require("./config/auth"));

// API routes must be before the "catch all" route
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/goals", require("./routes/api/goals"));
app.use("/api/exercise", require("./routes/api/exercise"));
app.use("/api/meals", require("./routes/api/meals"));

// "catch all" route
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
  console.log(`> Local: http://localhost:${port}/`);
});
