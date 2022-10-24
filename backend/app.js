const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const Sequilize = require("sequelize");
const sequilize = new Sequilize("groupmania_sql", "root", "1571256,Gaps", {
  host: "localhost",
  dialect: "mysql",
});

sequilize
  .authenticate()
  .then(() => {
    console.log("yes");
  })
  .catch((err) => {
    console.log("no");
  });

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "1mb" }));

// routes
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
