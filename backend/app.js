const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const app = express();
const db = require("./models");
const helmet = require("helmet");

const AppError = require("./errorHandler/appError");
const globalErrorHandler = require("./errorHandler/globalErrorHandler");
const databaseError = require("./errorHandler/databaseError");

// ROUTES
const authRoutes = require("./routes/auth-routes");

// Utilisation de sequelize
db.sequelize
  .authenticate()
  .then(() => {
    console.log(
      "✅ Connection to the database has been established successfully"
    );
  })
  .catch((error) => {
    console.log("⛔️ Unable to connect to the database : ", error);
  });

app.use(bodyParser.json());
app.use(helmet()); // Serutiy for http
app.use(cors({ origin: "http://localhost:5000", credentials: true }));

// ROUTES
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", authRoutes);

// ERROR HANDLING
app.all("*", (req, res, next) => {
  next(
    new AppError(`Not possible to find ${req.originalUrl} on this server`, 404)
  );
});
app.use(globalErrorHandler);
app.use(databaseError);

module.exports = app;
