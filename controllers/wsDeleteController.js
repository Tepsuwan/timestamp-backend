const WsDelete = require("../model/wsDelete");

exports.create = (req, res) => {
  WsDelete.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
