const BinLoad = require("../model/binLoadModel");

exports.findAll = (req, res) => {
  BinLoad.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
