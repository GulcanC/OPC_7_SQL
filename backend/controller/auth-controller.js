const bcrypt = require("bcrypt");
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middleware/asyncHandler");
const appErrorHandler = require("../errorHandler/appError");

const { User } = require("../models");
const AppError = require("../errorHandler/appError");
console.log(User);

// SIGNUP
exports.signup = asyncHandler(async (req, res, next) => {
  // Encrypte email before sending to the database
  const emailCryptoJS = cryptojs
    .HmacSHA256(req.body.email, process.env.EMAIL_CRYPTO)
    .toString();
  console.log(cryptojs);

  // Hash password before sending to the database
  const hashPassword = await bcrypt.hash(req.body.password, 10);

  const { email, ...userData } = req.body;

  const [user, created] = await User.findOrCreate({
    where: { email: emailCryptoJS },
    defaults: {
      ...userData,
      password: hashPassword,
      email: emailCryptoJS,
    },
  });

  if (!created) {
    return next(
      new AppError(
        "This account already exist, please sign in or use a new email address",
        400
      )
    );
  }
  res.status(201).json({ message: "✅ User created!" });
});
