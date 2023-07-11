const WsInsert = require("../model/wsInsertModel");

exports.create = (req, res) => {
  WsInsert.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
