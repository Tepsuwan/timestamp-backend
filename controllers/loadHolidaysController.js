const LoadHolidays = require("../model/loadHolidaysModel");

exports.findAll = (req, res) => {
  LoadHolidays.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.send(data);
  });
};
