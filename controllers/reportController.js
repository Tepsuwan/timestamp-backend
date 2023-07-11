const Report = require("../model/reportModel");

exports.findAll = (req, res) => {
  Report.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
