const RoleUpdate = require("../model/roleUpdateModel");

exports.create = (req, res) => {
  RoleUpdate.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
