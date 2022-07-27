const equimentModels = require("../models/equimentModels");
const {
  SendErrorMessageSv,
  SendErrorMessageData,
} = require("../modules/response");

class equipmentController {
  postEquipment = async (req, res) => {
    if (!req.body.name || !req.body.place || !req.body.dates) {
      return res.send("Can not emty ");
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
        equimentModels.create(req.body, (err, equiment) => {
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
  deleteEquipment = async (req, res) => {
    const id = req.params.id;
    try {
      equimentModels.findById(id, (err, equiment) => {
        if (!err) {
          if (equiment.length > 0) {
            equimentModels.delete(id, (err, result) => {
              if (err) throw err;
              else {
                res.json({ success: "001", message: "Delete Success" });
              }
            });
          } else {
            SendErrorMessageData;
          }
        }
      });
    } catch (error) {
      SendErrorMessageSv(res);
    }
  };
  putEquipment = async (req, res) => {
    const id = req.params.id;
    if (!req.body.name || !req.body.place || !req.body.dates) {
      return res.send("Can not emty ");
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
        equimentModels.update(id, req.body, (err, equiment) => {
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
  getAllEquipment = async (req, res) => {
    const limit = req.query.limit;
    const page = req.query.page;
    const offset = (page - 1) * limit;
    equimentModels.list((err, consulting) => {
      if (err) throw err;
      else {
        equimentModels.pagination(limit, offset, (err, results) => {
          if (err) throw err;
          res.status(200).json({
            total: consulting.length,
            data: results,
          });
        });
      }
    });
  };
  getEquipment = async (req, res) => {
    const id = req.params.id;
    try {
      equimentModels.findById(id, (err, equiment) => {
        if (!err) {
          if (equiment.length > 0) {
            res.status(200).json({
              success: "001",
              data: equiment,
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

module.exports = new equipmentController();
