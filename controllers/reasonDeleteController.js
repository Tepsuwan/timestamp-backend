const ReasonDelete = require("../model/reasonDeleteModel");

exports.create = (req, res) => {
  ReasonDelete.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.send(data);
  });
};
