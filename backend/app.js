const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const Sequilize = require("sequelize");
require("dotenv").config({ path: "./.env" });

const sequilize = new Sequilize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  }
);

sequilize
  .authenticate()
  .then(() => {
    console.log("✅ Connected to the sql database!");
  })
  .catch((err) => {
    console.log("⛔️ Fail to connect to the sql database!");
  });
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "1mb" }));

// routes
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
