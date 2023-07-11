const ExtraUpdate = require("../model/extraUpdateModel");

exports.create = (req, res) => {
  ExtraUpdate.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.send(data);
  });
};
