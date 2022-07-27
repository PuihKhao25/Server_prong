const magazineModels = require("../models/magazineModels");
const { validationResult } = require("express-validator");
const {
  SendSuccessMessageCreate,
  SendErrorMessageSv,
  SendErrorMessageData,
} = require("../modules/response");

class magazineController {
  //create post magazines
  postMagazines = async (req, res) => {
    try {
    } catch (error) {
      SendErrorMessageSv(res);
    }
  };
  //delete magazine
  deleteMagazines = async (req, res) => {
    try {
    } catch (error) {
      SendErrorMessageSv(res);
    }
  };
  // update magazines
  putMagazines = async (req, res) => {
    try {
    } catch (error) {
      SendErrorMessageSv(res);
    }
  };
  // Get all magazines
  getAllMagazines = async (req, res) => {
    try {
    } catch (error) {
      SendErrorMessageSv(res);
    }
  };
  // Get detail  magazine
  getMagazines = async (req, res) => {
    try {
    } catch (error) {
      SendErrorMessageSv(res);
    }
  };
}

module.exports = new magazineController();
