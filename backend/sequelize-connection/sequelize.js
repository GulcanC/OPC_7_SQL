const Sequelize = require("sequilize");
const fs = require("fs");
const path = require("path");
const baseName = path.basename(__filename);
const env = process.env.NODE8ENV || "development";
const config = require(__dirname + "/../database/database.js")[env];
const database = {};
const sequelize = new Sequelize({ ...config });

// Authentication
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Coonection database is succesfull!");
  })
  .catch((error) => {
    console.log(`⛔️ Not connected to the database: ${error}`);
  });

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== baseName && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    database[model.name] = model;
  });

Object.keys(database).forEach((modelName) => {
  if (database[modelName].associate) {
    database[modelName].associate(database);
  }
});

database.Sequelize = Sequelize;
database.sequelize = sequelize;

module.ewports = database;
