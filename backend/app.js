const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// Routers

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "1mb" }));

// ROUTES
app.use("/images", express.static(path.join(__dirname, "images")));
// ERROR HANDLING
// Route not defined
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handler

// Export app
module.exports = app;

// HEROKU
// https://dashboard.heroku.com/upgrade
