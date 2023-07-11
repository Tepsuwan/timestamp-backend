const HolidaysReport = require("../model/holidaysReportModel");

exports.findAll = (req, res) => {
  HolidaysReport.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
