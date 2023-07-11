const UserData = require("../model/userDataModel");

exports.findAll = (req, res) => {
  UserData.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.send({ data: data });
  });
};
