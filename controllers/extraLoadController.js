const ExtraLoad = require("../model/extraLoadModel");

exports.findAll = (req, res) => {
  ExtraLoad.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
