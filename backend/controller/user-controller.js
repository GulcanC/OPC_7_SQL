const bcrypt = require("bcrypt");
const asyncHandler = require("../middleware/asyncHandler");
const appError = require("../errorHandler/appError");
const { User, Sequelize } = require("../models");

// GET ONE USER using id
exports.getOneUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findOne({
    where: { id: userId },

    // exclude defines columns that you don't want to show
    attributes: { exclude: ["email", "password", "createdAt", "updatedAt"] },
  });

  if (user === null) {
    return next(new appError("⛔️ User not found!", 404));
  } else {
    res.status(200).json({ user });
  }
});

// GET CURRENT USER
exports.getCurrentUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.auth.userId,
    },
    attributes: ["id", "role"],
  });

  if (user === null) {
    return next(new appError("⛔️ User not found!", 404));
  } else {
    res.status(200).json({ user });
  }
});

// GET ALL USERS
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ["email", "password", "createdAt", "updatedAt"] },
  });

  if (users === null) {
    return next(new appError("⛔️ Users not found!", 404));
  } else {
    res.status(200).json({ users });
  }
});

// MODIFY USER
exports.modifyUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const modifiedData = req.body;

  if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/images/user-image/${
      req.file.filename
    }`;
  }

  const user = await User.update(
    { ...modifiedData, profilPicture: imageUrl },
    { where: { id: userId }, returning: true, plain: true }
  );

  if (user[1] !== 0) {
    res.status(200).json({
      message: "✅ User information has been succefully modified!",
      user,
    });
  } else {
    return next(new appError("⛔️ No user found matching this ID", 404));
  }
});
