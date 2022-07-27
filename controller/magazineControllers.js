const magazineModels = require("../models/magazineModels");
const { validationResult } = require("express-validator");
const {
  SendSuccessMessageCreate,
  SendErrorMessageSv,
  SendErrorMessageData,
} = require("../modules/response");

class magazineController {
  postMagazines = async (req, res) => {
    var errors = validationResult(req);
    var arrayError = errors.array();
    if (arrayError.length > 0) {
      var message = [];
      arrayError.forEach((element) => {
        message.push(element.msg);
      });
      return res.status(500).json({ success: "005", message: message });
    }
    try {
      if (
        req.body.contructor === Object &&
        Object.keys(req.body).length === 0
      ) {
        res
          .status(400)
          .send({ success: "004", message: "please fill all field" });
      } else {
        magazineModels.create(req.body, (err, magazine) => {
          if (err) {
            res.send(err);
          } else {
            SendSuccessMessageCreate(res);
          }
        });
      }
    } catch (error) {
      SendErrorMessageSv(res);
    }
  };
  deleteMagazines = async (req, res) => {
    const id = req.params.id;
    try {
      magazineModels.findById(id, (err, magazine) => {
        if (!err) {
          if (magazine.length > 0) {
            magazineModels.delete(id, (err, result) => {
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
  putMagazines = async (req, res) => {
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
      if (
        req.body.contructor === Object &&
        Object.keys(req.body).length === 0
      ) {
        res
          .send(400)
          .send({ success: false, message: "please fill all field" });
      } else {
        magazineModels.update(req.params.id, data, (err, magazine) => {
          if (err) {
            throw err;
          } else {
            res.json({ status: true, message: "Update Success" });
          }
        });
      }
    } catch (error) {
      SendErrorMessageSv(res);
    }
  };
  getAllMagazines = async (req, res) => {
    const limit = req.query.limit;
    const page = req.query.page;
    const offset = (page - 1) * limit;
    magazineModels.list((err, consulting) => {
      if (err) throw err;
      else {
        magazineModels.pagination(limit, offset, (err, results) => {
          if (err) throw err;
          res.status(200).json({
            total: consulting.length,
            data: results,
          });
        });
      }
    });
  };
  getMagazines = async (req, res) => {
    const id = req.params.id;
    try {
      magazineModels.findById(id, (err, magazine) => {
        if (!err) {
          if (magazine.length > 0) {
            res.status(200).json({
              success: "001",
              data: magazine,
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

module.exports = new magazineController();
