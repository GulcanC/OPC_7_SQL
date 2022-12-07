const bcrypt = require("bcrypt");
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middleware/asyncHandler");
const appError = require("../errorHandler/appError");

const { User } = require("../models");
console.log(User);

// SIGNUP
exports.signup = asyncHandler(async (req, res, next) => {
  // Encrypte email before sending to the database
  const emailCryptoJS = cryptojs
    .HmacSHA256(req.body.email, process.env.EMAIL_CRYPTO)
    .toString();
  // console.log(cryptojs);

  // Hash password before sending to the database
  const hashPassword = await bcrypt.hash(req.body.password, 10);

  const { email, ...userData } = req.body;

  //https://sebhastian.com/sequelize-findorcreate/

  // Use sequelize findOrCreate function
  User.findOrCreate({
    where: { email: emailCryptoJS },
    defaults: {
      ...userData,
      password: hashPassword,
      email: emailCryptoJS,
    },
  }).then(([user, created]) => {
    console.log(created);
    if (created) {
      res.status(201).json({ message: "✅ User created!", user });
    } else {
      return next(
        new appError(
          "This account already exist, please sign in or use a new email address",
          400
        )
      );
    }
  });
});

// LOGIN
exports.login = asyncHandler(async (req, res, next) => {
  console.log("🎉🎉🎉USER LOGIN🎉🎉🎉");
  console.log(req.body);
  const emailCryptoJS = cryptojs
    .HmacSHA256(req.body.email, process.env.EMAIL_CRYPTO)
    .toString();
  // console.log(cryptojs);

  // check whether crypto email exists in the database
  User.findOne({
    where: { email: emailCryptoJS },
  })
    .then((user) => {
      // if the value is null, user does not exist in the database
      if (user === null) {
        res
          .status(401)
          .json({ message: "⛔️ Account does not exist! Please register!" });
        // if we have a value, compare the password which is in the database and user password
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res
                .status(401)
                .json({ message: "⛔️ Email and password do not match" });
            }
            // if password is correct we have userId and token
            else if (valid) {
              res.status(200).json({
                message: "✅ User login is successful!",
                token: jwt.sign(
                  { userId: user._id },
                  process.env.JWT_KEY_TOKEN,
                  { expiresIn: "24h" }
                ),
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
});
