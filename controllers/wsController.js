const Ws = require("../model/wsModel");

exports.findAll = (req, res) => {
  Ws.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
