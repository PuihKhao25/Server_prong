const { body } = require("express-validator");

const validateConsult = () => {
  return [
    body("name").notEmpty().withMessage("Please provide name!"),
    body("place").notEmpty().withMessage("Please provide place!"),
  ];
};

const validateEquipment = () => {
  return [
    body("name").notEmpty().withMessage("Please provide name!"),
    body("place").notEmpty().withMessage("Please providein place!"),
  ];
};

const validateMagazine = () => {
  return [
    body("name").notEmpty().withMessage("Please enter your name!"),
    body("space").notEmpty().withMessage("Please enter your space!"),
    body("area").notEmpty().withMessage("Please enter your area!"),
    body("dates").notEmpty().withMessage("Please enter your dates!"),
  ];
};
const validateAuth = () => {
  return [
    body("name").notEmpty().withMessage("Please enter your name!"),
    body("password")
      .notEmpty()
      .withMessage("Password can not emty!")
      .isLength({ min: 5, max: 15 })
      .withMessage("Please enter password at least 5 characters to 15!"),
    body("email")
      .notEmpty()
      .withMessage("Please enter your email!")
      .isEmail()
      .withMessage("Please enter correct: aaa@abc.com!"),
  ];
};
const validateAuthLogin = () => {
  return [
    body("password")
      .notEmpty()
      .withMessage("Password can not emty!")
      .isLength({ min: 5, max: 15 })
      .withMessage("Please enter password at least 5 characters to 15!"),
    body("email")
      .notEmpty()
      .withMessage("Please enter your email!")
      .isEmail()
      .withMessage("Please enter correct: aaa@abc.com!"),
  ];
};

module.exports = {
  validateConsult,
  validateEquipment,
  validateMagazine,
  validateAuth,
  validateAuthLogin,
};
