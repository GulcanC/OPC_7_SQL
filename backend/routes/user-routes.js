const express = require("express");
const router = express.Router();
const userController = require("../controller/user-controller");
const authentication = require("../middleware/authentication");

router.get("/:userId", authentication, userController.getOneUser);
router.get("/currentUser", authentication, userController.getCurrentUser);
router.get("/", authentication, userController.getAllUsers);

module.exports = router;
