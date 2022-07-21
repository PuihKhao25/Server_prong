const db = require("../config/connectDB");
const magazineModels = require("../models/magazineModels");
const { validationResult } = require("express-validator");

// Create magazine
const createMagazine = async (req, res, next) => {
  var errors = validationResult(req);
  var arrayError = errors.array();
  if (arrayError.length > 0) {
    var message = [];
    arrayError.forEach((element) => {
      message.push(element.msg);
    });
    return res.status(500).json({ success: false, message: message });
  }
  const data = req.body;
  try {
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
      res.send(400).send({ success: false, message: "please fill all field" });
    } else {
      magazineModels.create(data, (err, magazine) => {
        {
          if (err) {
            res.send(err);
          } else {
            res.json({
              status: true,
              message: "Create Success",
              datas: magazine.insertId,
            });
          }
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// Delete magazine
const deleteMagazine = async (req, res, next) => {
  const id = req.params.id;
  try {
    magazineModels.findById(id, (err, magazine) => {
      if (!err) {
        if (magazine.length > 0) {
          magazineModels.delete(id, (err, result) => {
            if (err) throw err;
            else {
              res.json({ status: true, message: "Delete Success" });
            }
          });
        } else {
          res.send("Not found data 2000");
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

//Update Magazine
const updateMagazine = async (req, res, next) => {
  var errors = validationResult(req);
  var arrayError = errors.array();
  if (arrayError.length > 0) {
    var message = [];
    arrayError.forEach((element) => {
      message.push(element.msg);
    });
    return res.status(500).json({ success: false, message: message });
  }
  const data = req.body;
  try {
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
      res.send(400).send({ success: false, message: "please fill all field" });
    } else {
      magazineModels.update(req.params.id, data, (err, magazine) => {
        {
          if (err) {
            throw err;
          } else {
            res.json({ status: true, message: "Update Success" });
          }
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get list magazine
const getAllMagazine = async (req, res, next) => {
  const resultPage = 3;
  try {
    magazineModels.list((err, result) => {
      if (err) throw err;
      const numberOf = result.length;
      const numberPage = Math.ceil(numberOf / resultPage);
      let page = req.query.page ? Number(req.query.page) : 1;
      if (page > numberPage) {
        res.send("/?page" + encodeURIComponent(numberPage));
      } else if (page < 1) {
        res.send("/?page" + encodeURIComponent(1));
      }
      const startingLimit = (page - 1) * resultPage;
      magazineModels.pagination(startingLimit, resultPage, (err, magazine) => {
        if (err) throw err;
        let iterator = page - 3 < 1 ? 1 : page - 3;
        let endinglink =
          iterator + 5 <= numberPage ? iterator + 5 : page + numberPage;
        if (endinglink < page + 4) {
          iterator -= page + 4 - numberPage;
        }
        res.send(magazine);
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// get detail magazine byId

const detailMagazine = async (req, res, next) => {
  const id = req.params.id;
  try {
    magazineModels.findById(id, (err, magazine) => {
      if (!err) {
        if (magazine.length > 0) {
          res.send(magazine);
        } else {
          res.send("Not found data 2000");
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createMagazine,
  deleteMagazine,
  updateMagazine,
  getAllMagazine,
  detailMagazine,
};
