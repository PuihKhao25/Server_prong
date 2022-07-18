const db = require("../config/connectDB");
const { validationResult } = require("express-validator");

const createEquipment = async (req, res, next) => {
  var data = {
    name: req.body.name,
    place: req.body.place,
    dates: req.body.dates,
    image: req.file.filename,
  };
  try {
    let result = await db.query(
      "INSERT INTO equipments SET?",
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

const deleteEquipment = async (req, res, next) => {
  try {
    var id = req.params.id;
    let result = await db.query(
      "DELETE FROM equipments WHERE id=?",
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

const updateEquipment = async (req, res, next) => {
  try {
    var id = req.params.id;
    const data = {
      name: req.body.name,
      describe: req.body.describe,
      image: req.file.filename,
    };
    let result = await db.query(
      "UPDATE equipments SET ? WHERE id=?",
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

const detailEquipment = async (req, res, next) => {
  try {
    var id = req.params.id;
    let result = await db.query(
      "SELECT * FROM equipments WHERE id =?",
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

const getAllEquipment = async (req, res, next) => {
  try {
    var id = req.params.id;
    let result = await db.query(
      "SELECT * FROM equipments",
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
  createEquipment,
  deleteEquipment,
  updateEquipment,
  detailEquipment,
  getAllEquipment,
};
