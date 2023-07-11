const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const connection = require("../db/database");

const LoadSummary = function (loadSummary) {};
LoadSummary.getAll = (req, res) => {
  function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${padToTwoDigits(hours)}.${padToTwoDigits(minutes)}`;
  }

  function padToTwoDigits(num) {
    return num.toString().padStart(2, "0");
  }
  var from = req.query.from;
  var to = req.query.to;
  var team = req.query.team;
  var staffId = req.query.staffId;
  var checked = req.query.checked;
  var userId = req.query.userId;
  var data = [];
  console.log(staffId);
  var query =
    "SELECT a.stamp_id, DATE_FORMAT(a.stamp_date,'%d/%m/%Y') as stamp_date,DATE_FORMAT(a.stamp_date,'%a') as dText," +
    " concat(b.Name ,' (',b.NickName,')') as stamp_uid," +
    " if(a.stamp_start='0000-00-00 00:00:00','',DATE_FORMAT(a.stamp_start,'%H:%i:%s')) as stamp_start," +
    " if(a.stamp_stop='0000-00-00 00:00:00','',DATE_FORMAT(a.stamp_stop,'%H:%i:%s')) as stamp_stop," +
    " a.stamp_note," +
    " if(c.stamp_shift=''||ISNULL(c.stamp_shift),if(g.work_shift_start='none','none',concat(g.work_shift_start,'-',g.work_shift_stop))," +
    " if(i.work_shift_start='none','none',if(i.work_shift_start='OT','OT',concat(i.work_shift_start,'-',i.work_shift_stop)))) as work_shift_id," +
    " c.late as stamp_late, " +
    " c.overtime as stamp_ot, " +
    " if(a.stamp_start_ip = a.stamp_stop_ip, a.stamp_start_ip, if(a.stamp_stop_ip!='', concat(a.stamp_start_ip, ' - ', a.stamp_stop_ip), a.stamp_start_ip)) as stamp_ip" +
    ", c.before_time as stamp_before,f.reason_name as reason_id,c.hours as work_hours" +
    " FROM bz_timestamp.t_stamp a" +
    " INNER JOIN baezenic_people.t_people b ON CONVERT(b.id USING utf8) = CONVERT(a.stamp_uid USING utf8)" +
    " LEFT JOIN bz_timestamp.t_late c ON c.stamp_id = a.stamp_id" +
    " LEFT JOIN bz_timestamp.t_reason f ON f.reason_id = a.reason_id" +
    " LEFT JOIN bz_timestamp.t_work_shift g ON g.work_shift_id = a.work_shift_id" +
    " LEFT JOIN bz_timestamp.t_work_shift i ON i.work_shift_id = c.stamp_shift" +
    " WHERE a.is_delete = 0";

  if (team != undefined) {
    query += " AND b.Team = '" + team + "'";
  }
  if (staffId != undefined) {
    query += " AND b.id = '" + staffId + "'";
  }
  if (checked === "true") {
    query += " AND DATE_FORMAT(a.stamp_date, '%Y-%m') = '" + date("Y-m") + "'";
  } else {
    query +=
      " AND DATE_FORMAT(a.stamp_date, '%Y-%m-%d') BETWEEN '" +
      from +
      "' AND '" +
      to +
      "'";
  }
  query += " ORDER BY a.stamp_date ASC";

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      Object.keys(result).forEach(function (key) {
        var items = result[key];
        var obj = {
          stampId: items.stamp_id,
          day: items.dText,
          stampDate: items.stamp_date,
          stampUid: items.stamp_uid,
          stampStart: items.stamp_start,
          startStop: items.stamp_stop,
          workShiftId: items.work_shift_id,
          workHours: toHoursAndMinutes(items.work_hours),
          stampLate: items.stamp_late,
          stampOt: items.stamp_ot,
          stampBefore: items.stamp_before,
          reasonId: items.reason_id,
          stampIp: items.stamp_ip,
          stampNote: items.stamp_note,
        };
        data.push(obj);
      });
      var query2 =
        "SELECT concat('Total') as stamp_stop, if(SUM(c.late)<=0, 0, SUM(c.late)) as stamp_late, " +
        " if(SUM(c.overtime)<=0, 0, SUM(c.overtime)) as stamp_ot" +
        " FROM bz_timestamp.t_stamp a" +
        " INNER JOIN baezenic_people.t_people b ON CONVERT(b.id USING utf8) = CONVERT(a.stamp_uid USING utf8)" +
        " LEFT JOIN bz_timestamp.t_late c ON c.stamp_id = a.stamp_id" +
        " WHERE a.is_delete = 0";

      if (team != undefined) {
        query2 += " AND b.Team = '" + team + "'";
      }
      if (staffId != undefined) {
        query2 += " AND b.Team = '" + staffId + "'";
      } else {
        query2 += " AND a.stamp_uid = '" + userId + "'";
      }
      if (staffId === "true") {
        query2 +=
          " AND DATE_FORMAT(a.stamp_date, '%Y-%m') = '" + date("Y-m") + "'";
      } else {
        query2 +=
          " AND DATE_FORMAT(a.stamp_date, '%Y-%m-%d') BETWEEN '" +
          from +
          "' AND '" +
          to +
          "'";
      }
      query2 += " ORDER BY a.stamp_date ASC";

      connection.query(query2, (err2, result2) => {
        if (err) {
          console.log(err2);
        } else {
          //console.log(result2);
          var obj = {
            stampStop: result2[0].stamp_stop,
            stampLate: result2[0].stamp_late,
            stampOt: result2[0].stamp_ot,
          };
          data.push(obj);
          //console.log(data);
          res(null, data);
        }
      });
    }
  });
};

module.exports = LoadSummary;
