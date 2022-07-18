const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Auth = require("../models/users");

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
      return res.status(500).json({
        success: false,
        message: error,
      });
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
      return res.status(500).json({
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
              message: "Password already exists",
            });

          const accessToken = jwt.sign(
            { user_id: result.id },
            process.env.ACCESS_TOKEN
          );
          return res.status(200).json({
            success: true,
            token: accessToken,
          });
        } else {
          return res.status(300).json({
            success: false,
            message: "Email does not exist",
          });
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: "server error" });
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
      return res.status(500).json({
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
              const accessToken = jwt.sign(
                { user_id: result.id },
                process.env.ACCESS_TOKEN
              );
              return res
                .cookie("access_token", accessToken, {
                  maxAge: 900000,
                  httpOnly: true,
                })
                .status(200)
                .json({
                  success: true,
                  message: "Sigup successfully",
                  token: accessToken,
                });
            } else {
              return res
                .status(300)
                .json({ success: false, message: "Sigup failed" });
            }
          });
        } else {
          return res.status(300).json({
            success: false,
            message: "Account already exists!",
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };
}

module.exports = new AuthController();
