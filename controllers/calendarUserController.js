const CalendarUser = require("../model/calendarUserModel");

exports.findAll = (req, res) => {
  CalendarUser.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
