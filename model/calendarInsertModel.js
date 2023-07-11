const crypto = require("crypto");
const connection = require("../db/database");
const moment = require("moment");

const CalendarInsert = function (calendarInsert) {};

CalendarInsert.getAll = (req, res) => {
  var workShiftId = req.body.workShiftId;
  var nextDayId = req.body.nextDayId;
  var start = req.body.start;
  var end = req.body.end;
  var bgColor = req.body.bgColor;
  var borderColor = req.body.borderColor;
  var team = req.body.team;
  var uid = req.body.uid;
  var createDate = req.body.createDate;
  var calendarId = crypto.randomBytes(6).toString("hex");

  console.log(req.body);
  //if (team != "PE") {
  const query =
    "INSERT INTO bz_timestamp.t_calendar SET " +
    "calendar_id='" +
    calendarId +
    "'," +
    "work_shift_id='" +
    workShiftId +
    "'," +
    "uid='" +
    uid +
    "'," +
    "calendar_date_start='" +
    start +
    "'," +
    "calendar_date_end='" +
    end +
    "', " +
    "calendar_bg_color='" +
    bgColor +
    "'," +
    "calendar_border_color='" +
    borderColor +
    "'," +
    "team='" +
    team +
    "'," +
    "create_uid='" +
    uid +
    "'," +
    "create_date='" +
    createDate +
    "'";

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res(null, { success: true });
      console.log("Insert query1 success");
    }
  });
};

module.exports = CalendarInsert;
