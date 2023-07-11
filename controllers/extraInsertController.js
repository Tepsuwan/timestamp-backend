const ExtraInsert = require("../model/extraInsertModel");

exports.create = (req, res) => {
  ExtraInsert.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.send(data);
  });
};
