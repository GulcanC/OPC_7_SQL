"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Article.hasMany(models.Comment, {
        as: "comment",
        onDelete: "cascade",
        hooks: true,
        foreignKey: "articleId",
      });

      Article.hasMany(models.Like, {
        as: "like",
        onDelete: "cascade",
        hooks: true,
        foreignKey: "articleId",
      });
      Article.belongsTo(models.User, { as: "user", foreignKey: "userId" });
    }
  }
  Article.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      image: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "Article",
    }
  );
  return Article;
};
