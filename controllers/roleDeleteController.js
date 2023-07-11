const RoleDelete = require("../model/roleDeleteModel");

exports.create = (req, res) => {
  RoleDelete.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
