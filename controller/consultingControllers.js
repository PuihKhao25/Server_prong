const cloudinary = require("../middlewares/cloudinary");
const consultingModels = require("../models/consultingModels");
const {
  SendSuccessMessageCreate,
  SendErrorMessageSv,
  SendErrorMessageData,
  SendErrorMessageCNT,
} = require("../modules/response");

const createConsulting = async (req, res, next) => {
  if (!req.body.name || !req.body.place || !req.body.dates) {
    SendErrorMessageCNT(res)
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
          SendSuccessMessageCreate(res)
        }
      }
    });
  } catch (error) {
    SendErrorMessageSv(res);
  }
};

const deleteConsulting = async (req, res, next) => {
  const id = req.params.id;

  try {
    consultingModels.findById(id, (err, consulting) => {
      if (!err) {
        if (consulting.length > 0) {
          consultingModels.delete(id, (err, result) => {
            if (err) throw err;
            else {
              res.json({ status: true, message: "Delete Success" });
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

const updateConsulting = async (req, res, next) => {
  const id = req.params.id;
  if (!req.body.name || !req.body.place || !req.body.dates) {
    SendErrorMessageCNT(res)
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
    SendErrorMessageSv(res);
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
          SendErrorMessageData(res);
        }
      }
    });
  } catch (error) {
    SendErrorMessageSv(res);
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
        (err, consulting) => {
          if (err) throw err;
          let iterator = page - 3 < 1 ? 1 : page - 3;
          let endinglink =
            iterator + 5 <= numberPage ? iterator + 5 : page + numberPage;
          if (endinglink < page + 4) {
            iterator -= page + 4 - numberPage;
          }
          res.send(consulting);
        }
      );
    });
  } catch (error) {
    SendErrorMessageSv(res);
  }
};

module.exports = {
  createConsulting,
  deleteConsulting,
  updateConsulting,
  detailSulting,
  getAllSulting,
};
