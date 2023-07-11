const WsUpdate = require("../model/wsUpdateModel");

exports.create = (req, res) => {
  WsUpdate.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
