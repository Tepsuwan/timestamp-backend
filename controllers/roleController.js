const Role = require("../model/roldeModel");

exports.findAll = (req, res) => {
  Role.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
