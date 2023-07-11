const GetWorkShift = require("../model/getWorkShiftModel");

exports.findAll = (req, res) => {
  GetWorkShift.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
