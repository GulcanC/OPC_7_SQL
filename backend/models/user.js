"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Article, {
        onDelete: "cascade",
        hooks: "true",
        foreignKey: "userId",
        as: "article",
      });
      User.hasMany(models.Comment, {
        onDelete: "cascade",
        hooks: "true",
        foreignKey: "userId",
        as: "comment",
      });
      User.hasMany(models.Like, {
        onDelete: "cascade",
        hooks: "true",
        foreignKey: "userId",
        as: "like",
      });
    }
  }
  User.init(
    {
      firstname: { type: DataTypes.STRING, allowNull: false },
      lastname: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      profilPicture: {
        type: DataTypes.STRING,
        defaultValue: "../images/user-image/default-profile.png",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
