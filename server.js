require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const favicon = require("serve-favicon");

require("./config/database");
require("./src/utils/cronjobs"); // Import the cron jobs

// Require controllers here

const app = express();

// add in when the app is ready to be deployed
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(logger("dev"));
app.use(express.json());

// Configure the auth middleware
// This decodes the jwt token, and assigns
// the user information to req.user
app.use(require("./config/auth"));
// api routes must be before the "catch all" route
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/goals", require("./routes/api/goals")); 
app.use("/api/exercise", require("./routes/api/exercise"));
app.use("/api/meals", require("./routes/api/meals"));

// "catch all" route
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log();
  console.log(`  App running in port ${port}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${port}/\x1b[0m`);
});
