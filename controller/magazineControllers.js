const db = require("../config/connectDB");
const { validationResult } = require("express-validator");

const createMagazine = async (req, res, next) => {
  var data = {
    name: req.body.name,
    space: req.body.space,
    area: req.body.area,
    dates: req.body.dates,
  };
  try {
    var errors = validationResult(req);
    var arrayError = errors.array();
    if (arrayError.length > 0) {
      var message = [];
      arrayError.forEach((element) => {
        message.push(element.msg);
      });
      return res.status(500).json({ success: false, message: message });
    }
    let result = await db.query(
      "INSERT INTO magazines SET?",
      [data],
      function (err, rows) {
        if (err) {
          res.status(400).json({
            message: "False",
          });
        } else {
          res.status(200).json({
            message: "Create success",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "error server",
    });
  }
};

const deleteMagazine = async (req, res, next) => {
  try {
    var id = req.params.id;
    let result = await db.query(
      "DELETE FROM magazines WHERE id=?",
      id,
      function (err, rows) {
        if (err) {
          res.status(400).json({
            message: "False",
          });
        } else {
          res.status(200).json({
            message: "Delete success",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Error server",
    });
  }
};

const updateMagazine = async (req, res, next) => {
  try {
    var id = req.params.id;
    const data = {
      name: req.body.name,
      space: req.body.space,
      area: req.body.area,
      dates: req.body.dates,
      
    };
    let result = await db.query(
      "UPDATE magazines SET ? WHERE id=?",
      [data, id],
      function (err, rows) {
        if (err) {
          res.status(400).json({
            message: "False",
          });
        } else {
          res.status(200).json({
            message: "Update successfully",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Error server",
    });
  }
};

const detailMagazine = async (req, res, next) => {
  try {
    var id = req.params.id;
    let result = await db.query(
      "SELECT * FROM magazines WHERE id =?",
      id,
      function (err, rows) {
        if (err) {
          res.status(400).json({
            message: "False",
          });
        } else {
          res.status(200).json({
            message: "success",
            data: rows,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Error server",
    });
  }
};

const getAllMagazine = async (req, res, next) => {
  try {
    var id = req.params.id;
    let result = await db.query(
      "SELECT * FROM magazines",
      id,
      function (err, rows) {
        if (err) {
          res.status(400).json({
            message: "False",
          });
        } else {
          res.status(200).json({
            message: "success",
            data: rows,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Error server",
    });
  }
};

module.exports = {
  createMagazine,
  deleteMagazine,
  updateMagazine,
  detailMagazine,
  getAllMagazine,
};
