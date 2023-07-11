const UserInsert = require("../model/userInsertModel");

exports.create = (req, res) => {
  UserInsert.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
