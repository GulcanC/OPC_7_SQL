const express = require("express");
const router = express.Router();

const userController = require("../controller/user-controller");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const { userValidation } = require("../validation/user-validation");

const multer = require("../middleware/multer");
const sharp = require("../middleware/sharp");

const { User } = require("../models");

router.get("/:userId", authentication, userController.getOneUser);
router.get("/currentUser", authentication, userController.getCurrentUser);
router.get("/", authentication, userController.getAllUsers);
router.put(
  "/:userId",
  authentication,
  authorization(User),
  multer,
  sharp,
  userValidation,
  userController.modifyUser
);

module.exports = router;
