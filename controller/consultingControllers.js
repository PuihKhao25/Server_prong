
const cloudinary = require("../middlewares/cloudinary");
const consultingModels = require("../models/consultingModels");

const createConsulting = async (req, res, next) => {
  if(!req.body.name || !req.body.place || !req.body.dates){
    return res.send('Can not emty ')
  }
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    req.body.image = result.url;
  }
  try {
    consultingModels.create(req.body, (err, consulting) => {
      {
        if (err) {
          res.send(err);
        } else {
          res.json({
            status: true,
            message: "Create Success",
            datas: consulting.insertId,
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Error server",
    });
  }
};

const deleteConsulting = async (req, res, next) => {
  const id = req.params.id;

  try {
    consultingModels.findById(id, (err, magazine) => {
      if (!err) {
        if (magazine.length > 0) {
          consultingModels.delete(id, (err, result) => {
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

const updateConsulting = async (req, res, next) => {
  const id = req.params.id;
  if(!req.body.name || !req.body.place || !req.body.dates){
    return res.send('Can not emty ')
  }
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    req.body.image = result.url;
  }
  try {
    consultingModels.update(id, req.body, (err, consulting) => {
      if (err) {
        res.send(err);
      } else {
        res.json({
          status: true,
          message: "Update Success",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Error server",
    });
  }
};

const detailSulting = async (req, res, next) => {
  const id = req.params.id;
  try {
    consultingModels.findById(id, (err, consulting) => {
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

const getAllSulting = async (req, res, next) => {
  const resultPage = 3;
  try {
    consultingModels.list((err, result) => {
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
      consultingModels.pagination(
        startingLimit,
        resultPage,
        (err, magazine) => {
          if (err) throw err;
          let iterator = page - 3 < 1 ? 1 : page - 3;
          let endinglink =
            iterator + 5 <= numberPage ? iterator + 5 : page + numberPage;
          if (endinglink < page + 4) {
            iterator -= page + 4 - numberPage;
          }
          res.send(magazine);
        }
      );
    });
  } catch (error) {
    res.status(500).json({
      message: "Error server",
    });
  }
};

module.exports = {
  createConsulting,
  deleteConsulting,
  updateConsulting,
  detailSulting,
  getAllSulting,
};
