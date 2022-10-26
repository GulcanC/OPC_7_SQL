require("dotenv").config({ path: "./vars/.env" });
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
};

/* const mysql = require("mysql");

const db = mysql.createConnection({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: process.env.DIALECT,
  host: process.env.HOST,
});

db.connect(function (error) {
  if (error) {
    console.log(" ⛔️ Can not be connected to the data base sql!");
    throw error;
  } else {
    console.log(" ✅ Connected to the data base sql! ");
  }
});

module.exports.getDB = () => {
  return db;
};
 */
