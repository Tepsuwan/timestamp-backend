const LoadWorkShift = require("../model/loadWorkShiftModel");

exports.findAll = (req, res) => {
  LoadWorkShift.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
