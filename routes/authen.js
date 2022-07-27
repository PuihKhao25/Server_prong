const express = require("express");
const router = express.Router();
const AuthController = require("../controller/authenControllers");
const validate = require("../validate/validate");

router.post("/login", validate.validateAuthLogin(), AuthController.postLogin);
router.post("/register", validate.validateAuth(), AuthController.postRegister);

module.exports = router;
