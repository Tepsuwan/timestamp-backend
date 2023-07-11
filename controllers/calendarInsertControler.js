const CalendarInsert = require("../model/calendarInsertModel");

exports.create = (req, res) => {
  CalendarInsert.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.send(data);
  });
};
