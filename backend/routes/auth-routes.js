const express = require("express");
const router = express.Router();
const authController = require("../controller/auth-controller");
const { signupValidation } = require("../validation/signup-validation");
const { loginValidation } = require("../validation/login-validation");

router.post("/signup", signupValidation, authController.signup);
router.post("/login", loginValidation, authController.login);

module.exports = router;
