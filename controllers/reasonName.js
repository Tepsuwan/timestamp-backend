const ReasonName = require("../model/reasonName");

exports.findAll = (req, res) => {
  ReasonName.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
