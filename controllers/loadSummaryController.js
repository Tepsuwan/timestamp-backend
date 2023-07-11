const LoadSummary = require("../model/loadSummaryModel");

exports.findAll = (req, res) => {
  LoadSummary.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
