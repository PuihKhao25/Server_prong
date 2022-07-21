const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

const Auth = require("../models/users");
const {
  SendSuccessMessage,
  SendErrorMessageSv,
  SendErrorMessage,
} = require("../modules/response");

class AuthController {
  getAuth = async (req, res) => {
    try {
      await Auth.find(function (result) {
        if (result != null)
          return res.status(200).json({
            success: true,
            data: result,
          });
        else {
          return res.status(300).json({
            success: false,
            message: "Get null!",
          });
        }
      });
    } catch (error) {
      SendErrorMessageSv(error);
    }
  };
  userLogin = async (req, res) => {
    const { email, password } = req.body;
    var errors = validationResult(req);
    var arrayError = errors.array();
    if (arrayError.length > 0) {
      var message = [];
      arrayError.forEach((element) => {
        message.push(element.msg);
      });
     
      return res.status(200).json({
        success: false,
        message: message,
      });
    }
    try {
      await Auth.findById(email, async function (result) {
        if (result != null) {
          const passwordValid = await bcrypt.compare(
            password,
            result[0].password
          );
          if (!passwordValid)
            return res.status(300).json({
              success: false,
              message: "Password does not exist",
            });
          const accessToken = sign({ user_id: result.id }, "qwe1234", {
            expiresIn: "1h",
          });
          SendSuccessMessage(res, { token: accessToken });
        } else {
          return res.status(300).json({
            success: false,
            message: "Email does not exist",
          });
        }
      });
    } catch (error) {
      SendErrorMessageSv(error);
    }
  };

  userSignup = async (req, res) => {
    const { name, email, password } = req.body;
    var err = validationResult(req);
    var arrayError = err.array();
    if (arrayError.length > 0) {
      var message = [];
      arrayError.forEach((element) => {
        message.push(element.msg);
      });
      return res.status(200).json({
        success: false,
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
              const accessToken = jwt.sign({ user_id: result.id });
              return res.status(200).json({
                success: true,
                message: "Sigup successfully",
              });
            } else {
              return res
                .status(300)
                .json({ success: false, message: "Sigup failed" });
            }
          });
        }
      });
    } catch (error) {
      SendErrorMessageSv(error);
    }
  };
}

module.exports = new AuthController();
