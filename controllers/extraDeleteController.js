const ExtraDelete = require("../model/extraDeleteModel");

exports.create = (req, res) => {
  ExtraDelete.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.send(data);
  });
};
