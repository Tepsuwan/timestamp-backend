const UserUpdate = require("../model/userUpdateModel");

exports.create = (req, res) => {
  UserUpdate.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
