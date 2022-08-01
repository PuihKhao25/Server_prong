const consultingModels = require("../models/consultingModels");
const { validationResult } = require("express-validator");
const {
  SendErrorMessageSv,
  SendErrorMessageData,
  SendErrorMessageCNT
} = require("../modules/response");
const cloudinary = require("../middlewares/cloudinary")

class consultController {
  postConsults = async (req, res) => {
    if (!req.body.name || !req.body.place || !req.body.dates) {
      return SendErrorMessageCNT(res)
    }
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      req.body.image = result.url;
    }
    try {
      if (
        req.body.contructor === Object &&
        Object.keys(req.body).length === 0
      ) {
        res
          .send(400)
          .send({ success: "004", message: "please fill all field" });
      } else {
        consultingModels.create(req.body, (err, consulting) => {
          {
            if (err) {
              res.send(err);
            } else {
              res.json({
                success: "001",
                message: "Create Success",
              });
            }
          }
        });
      }
    } catch (error) {
      SendErrorMessageSv(res);
    }
  };
  deleteConsults = async (req, res) => {
    const id = req.params.id;
    try {
      consultingModels.findById(id, (err, consulting) => {
        if (!err) {
          if (consulting.length > 0) {
            consultingModels.delete(id, (err, result) => {
              if (err) throw err;
              else {
                res.json({ success: "001", message: "Delete Success" });
              }
            });
          } else {
            SendErrorMessageData(res);
          }
        }
      });
    } catch (error) {
      SendErrorMessageSv(res);
    }
  };
  putConsults = async (req, res) => {
    const id = req.params.id;
    if (!req.body.name || !req.body.place || !req.body.dates) {
      return SendErrorMessageCNT(res)
    }
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      req.body.image = result.url;
    }
    try {
      if (
        req.body.contructor === Object &&
        Object.keys(req.body).length === 0
      ) {
        res
          .send(400)
          .send({ success: false, message: "please fill all field" });
      } else {
        consultingModels.update(id, req.body, (err, consulting) => {
          {
            if (err) {
              res.send(err);
            } else {
              res.json({
                success: "001",
                message: "Update Success",
              });
            }
          }
        });
      }
    } catch (error) {
      SendErrorMessageSv(res);
    }
  };
  getAllConsults = async (req, res) => {
    const limit = req.query.limit;
    const page = req.query.page;
    const offset = (page - 1) * limit;
    consultingModels.list((err, consulting) => {
      if (err) throw err;
      else {
        consultingModels.pagination(limit, offset, (err, results) => {
          if (err) throw err;
          res.status(200).json({
            total: consulting.length,
            data: results,
          });
        });
      }
    });
  };
  getConsults = async (req, res) => {
    const id = req.params.id;
    try {
      consultingModels.findById(id, (err, consulting) => {
        if (!err) {
          if (consulting.length > 0) {
            res.status(200).json({
              success: "001",
              data: consulting,
            });
          } else {
            SendErrorMessageData(res);
          }
        }
      });
    } catch (error) {
      SendErrorMessageSv(res);
    }
  };
}

module.exports = new consultController();
