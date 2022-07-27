// user
const SendSuccessMessage = (res, data) => {
  return res.status(200).send({
    success: 001,
    data: data,
  });
};
const SendSuccessMessageCreate = (res, data) => {
    return res.status(200).send({
      success: 001,
      message: "Create Success",
      data: data,
    });
  };
const SendErrorMessage = (res, data) => {
  return res.status(200).send({
    success: 002,
    data: data,
  });
};

const SendErrorMessageData = (res) => {
  return res.status(400).send({
    success: 003,
    message: "Not found data 2000",
  });
};
const SendErrorMessageCNT = (res) => {
    return res.status(400).send({
      success: 004,
      message: "Can not emty",
    });
  };

const SendErrorMessageSv = (res) => {
  return res.status(500).send({
    success: 005,
    message: " Server error",
  });
};

module.exports = {
  SendSuccessMessage,
  SendErrorMessageSv,
  SendErrorMessage,
  SendErrorMessageData,
  SendSuccessMessageCreate,
  SendErrorMessageCNT
};
