const RoleInsert = require("../model/roleInsertmodel");

exports.create = (req, res) => {
  RoleInsert.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
