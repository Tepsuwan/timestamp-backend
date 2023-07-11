const CalendarDelete = require("../model/calendarDeleteModel");

exports.create = (req, res) => {
  CalendarDelete.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.send(data);
  });
};
