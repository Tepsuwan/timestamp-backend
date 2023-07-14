const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const connection = require("../db/database");
const { concatLimit } = require("async");

const GetWorkShift = function (getWorkShift) {};

GetWorkShift.getAll = (req, res) => {
  var team = req.query.team;
  var workShiftId = req.query.workShiftId;
  console.log(req.query);
  let query =
    "SELECT a.calendar_id, a.uid,if(a.uid='1234567890','Vietnam',b.NickName) as title," +
    " concat(a.calendar_date_start,' ',c.work_shift_start) as event_start, a.calendar_date_end as event_end," +
    " calendar_bg_color," +
    " calendar_border_color" +
    " FROM bz_timestamp.t_calendar a" +
    " LEFT JOIN baezenic_people.t_people b ON CONVERT(b.id USING utf8) = CONVERT(a.uid USING utf8)" +
    " LEFT JOIN bz_timestamp.t_work_shift c ON c.work_shift_id=a.work_shift_id" +
    " WHERE 1 AND a.team='" +
    team +
    "'";

  if (workShiftId != "All") {
    query += " AND a.work_shift_id='" + workShiftId + "'";
  }
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Load Calendar Success");
      var data = [];
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        var obj = {
          calendar_id: row.calendar_id,
          uid: row.uid,
          title: row.title,
          start: row.event_start,
          end: row.event_end,
          calendar_bg_color: row.calendar_bg_color,
          calendar_border_color: row.calendar_border_color,
        };
        data.push(obj);
      });
      res(null, { data: data });
    }
  });
};

module.exports = GetWorkShift;
