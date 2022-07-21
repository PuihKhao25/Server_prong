const { validationResult } = require("express-validator");
const equimentModels = require("../models/equimentModels");
const cloudinary = require("../middlewares/cloudinary");

const createEquipment = async (req, res, next) => {
  if (!req.body.name || !req.body.place || !req.body.dates) {
    return res.send("Can not emty ");
  }
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    req.body.image = result.url;
  }
  try {
    equimentModels.create(req.body, (err, result) => {
      if (err) throw err;
      else {
        res.send("create success");
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Error server",
    });
  }
};

const deleteEquipment = async (req, res, next) => {
  const id = req.params.id;
  try {
    equimentModels.findById(id, (err, magazine) => {
      if (!err) {
        if (magazine.length > 0) {
          equimentModels.delete(id, (err, result) => {
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
      message: "Error server",
    });
  }
};

const updateEquipment = async (req, res, next) => {
  const id = req.params.id;
  if (!req.body.name || !req.body.place || !req.body.dates) {
    return res.send("Can not emty ");
  }
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    req.body.image = result.url;
  }
  try {
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
      res.send(400).send({ success: false, message: "please fill all field" });
    } else {
      equimentModels.update(id, req.body, (err, consulting) => {
        {
          if (err) {
            res.send(err);
          } else {
            res.json({
              status: true,
              message: "Update Success",
            });
          }
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error server",
    });
  }
};

const detailEquipment = async (req, res, next) => {
  const id = req.params.id;
  try {
    equimentModels.findById(id, (err, consulting) => {
      if (!err) {
        if (consulting.length > 0) {
          res.send(consulting);
        } else {
          res.send("Not found data 2000");
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Error server",
    });
  }
};

const getAllEquipment = async (req, res, next) => {
  const resultPage = 3;
  try {
    equimentModels.list((err, result) => {
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
      equimentModels.pagination(startingLimit, resultPage, (err, magazine) => {
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
