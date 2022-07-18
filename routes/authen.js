var express = require("express");
var router = express.Router();

const AuthController = require("../controller/authenControllers");
const validate = require("../validate/validate");

router.post("/login", validate.validateAuthLogin(), AuthController.userLogin);
router.post("/register", validate.validateAuth(), AuthController.userSignup);

module.exports = router;
