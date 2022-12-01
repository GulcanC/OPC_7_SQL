const express = require("express");
const router = express.Router();
const authController = require("../controller/auth-controller");
const { signupValidation } = require("../validation/signup-validation");

router.post("/signup", signupValidation, authController.signup);

module.exports = router;
