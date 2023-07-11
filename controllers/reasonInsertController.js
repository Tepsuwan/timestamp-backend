const ReasonInsert = require("../model/reasonInsertModel");

exports.create = (req, res) => {
  ReasonInsert.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.send(data);
  });
};
