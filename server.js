require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
// const cors = require("cors");

require("./config/database");
require("./src/utils/cronjobs");

const app = express();

app.use(logger("dev"));
app.use(express.json());

// Configure CORS
// const corsOptions = {
//   origin: ["http://localhost:3000", "http://localhost:8000", "https://macro-count.vercel.app"], // Allow both local development and deployed domain
//   optionsSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

// Configure the auth middleware
app.use(require("./config/auth"));

// API routes must be before the "catch all" route
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/goals", require("./routes/api/goals"));
app.use("/api/exercise", require("./routes/api/exercise"));
app.use("/api/meals", require("./routes/api/meals"));
const manifest = require('./dist/manifest.json');
app.use(express.static(path.join(__dirname, "dist")));

// "catch all" route
app.get('/*', function(req, res) {
  res.render(path.join(__dirname, 'dist', 'index.ejs'), {manifest});
});


const { PORT = 8000 } = process.env;
app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});