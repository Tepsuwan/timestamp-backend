const LoadCalendar = require("../model/loadCalendarModel");

exports.findAll = (req, res) => {
  LoadCalendar.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
