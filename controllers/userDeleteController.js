const UserDelete = require("../model/userDeleteModel");

exports.create = (req, res) => {
  UserDelete.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
