const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Auth = require("../models/users");
const {
  SendSuccessMessage,
  SendErrorMessageSv,
} = require("../modules/response");

class AuthController {
  getAuth = async (req, res) => {
    try {
      await Auth.find(function (result) {
        if (result != null)
          return res.status(200).json({
            success: "001",
            data: result,
          });
        else {
          return res.status(200).json({
            success: false,
            message: "Get null!",
          });
        }
      });
    } catch (error) {
      SendErrorMessageSv(res);
    }
  };

  postLogin = async (req, res) => {
    const { email, password } = req.body;
    var errors = validationResult(req);
    var arrayError = errors.array();
    if (arrayError.length > 0) {
      var message = [];
      arrayError.forEach((element) => {
        message.push(element.msg);
      });
      return res.status(200).json({
        success: "002",
        message: message,
      });
    }
    try {
      await Auth.findById(email, async function (result) {
        if (result != null) {
          const passwordValid = await bcrypt.compare(password,result[0].password);
          if (!passwordValid)
            return res.status(200).json({
              success: "002",
              message: "Wrong password",
            });
          const accessToken = jwt.sign(
            { user_id: result.id },
            process.env.ACCESS_TOKEN,
            { expiresIn: "1h" }
          );
          SendSuccessMessage(res, { token: accessToken });
        } else {
          return res.status(200).json({
            success: "002",
            message: "Wrong email",
          });
        }
      });
    } catch (error) {
      SendErrorMessageSv(res);
    }
  };

  postRegister = async (req, res) => {
    const { name, email, password } = req.body;
    const err = validationResult(req);
    const arrayError = err.array();
    if (arrayError.length > 0) {
      var message = [];
      arrayError.forEach((element) => {
        message.push(element.msg);
      });
      return res.status(200).json({
        success: "002",
        message: message,
      });
    }
    try {
      await Auth.findById(email, async (result) => {
        if (result === null) {
          const salt = await bcrypt.genSalt(10);
          const hasPassword = await bcrypt.hash(password, salt);
          req.body.password = hasPassword;
          const createUser = await Auth.create(req.body, (result) => {
            if (result != null) {
              return res.status(200).json({
                success: "001",
                message: "Sign up successfully",
              });
            } else {
              return res
                .status(200)
                .json({ success: "002", message: "Sign up failed" });
            }
          });
        }
      });
    } catch (error) {
      SendErrorMessageSv(res);
    }
  };
}

module.exports = new AuthController();
