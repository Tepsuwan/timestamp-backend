const RoleLoad = require("../model/roleLoadModel");

exports.findAll = (req, res) => {
  RoleLoad.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
