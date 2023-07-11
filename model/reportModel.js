const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const connection = require("../db/database");
const async = require("async");

const Report = function (report) {};

Report.getAll = (req, res) => {
  function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${padToTwoDigits(hours)}.${padToTwoDigits(minutes)}`;
  }

  function padToTwoDigits(num) {
    return num.toString().padStart(2, "0");
  }
  var uid = req.query.uid;
  var from = req.query.from;
  var to = req.query.to;
  var checked = req.query.checked;
  var team = req.query.team;
  var office = req.query.office;
  var name = req.query.name;

  //console.log(name);
  var data = [];
  var query =
    "SELECT a.stamp_uid,a.stamp_id, concat('" +
    from +
    " - " +
    to +
    "') as stamp_date," +
    " concat(b.Name ,' (',b.NickName,')') as stamp_uid,b.id as uid," +
    " if(SUM(c.late)<=0,0,SUM(c.late)) as stamp_late," +
    " if(SUM(c.overtime)<=0,0,SUM(c.overtime)) as stamp_ot," +
    " if(SUM(c.before_time)<=0,0,SUM(c.before_time)) as stamp_before," +
    " if(f.work_shift_start='none',f.work_shift_start,concat(f.work_shift_start,'-', f.work_shift_stop)) as work_shift_id," +
    " sum(c.hours) as work_hours" +
    " FROM bz_timestamp.t_stamp a" +
    " INNER JOIN baezenic_people.t_people b ON CONVERT(b.id USING utf8)=CONVERT(a.stamp_uid USING utf8)" +
    " LEFT JOIN bz_timestamp.t_late c ON c.stamp_id=a.stamp_id" +
    " LEFT JOIN bz_timestamp.t_work_shift f ON f.work_shift_id=a.work_shift_id" +
    " WHERE a.is_delete=0";

  if (name != undefined && name != "") {
    query += " AND b.id ='" + name + "'";
  }

  if (team != undefined && team != "All" && team != "") {
    query += " AND b.Team ='" + team + "'";
  }

  if (office != undefined && office != "") {
    query += " AND b.Office ='" + office + "'";
  }
  if (checked === "true") {
    query += " AND DATE_FORMAT(a.stamp_date,'%Y-%m') ='" + date("Y-m") + "'";
  } else {
    query += " AND a.stamp_date BETWEEN '" + from + "' AND '" + to + "'";
  }
  query += " GROUP BY a.stamp_uid ORDER BY b.Name ASC";

  //console.log(query);
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        //console.log(row);
        var obj = {
          stampUid:
            '<a href="#' +
            row.stamp_uid +
            '\');" class="shift-detail" id=' +
            row.uid +
            ">" +
            row.stamp_uid +
            "</a>",
          stampId: row.stamp_id,
          stampDate: row.stamp_date,
          workShiftId: row.work_shift_id,
          workHours: toHoursAndMinutes(row.work_hours),
          stampLate: row.stamp_late,
          stampOt: row.stamp_ot,
          stampBefore: row.stamp_before,
        };
        //console.log(obj);
        data.push(obj);
        const query2 =
          "SELECT concat(b.work_shift_start,'-',work_shift_stop) as work FROM bz_timestamp.t_employee_time a LEFT JOIN bz_timestamp.t_work_shift b ON b.work_shift_id=a.work_shift_id WHERE `uid`='" +
          row.uid +
          "'";
        connection.query(query2, (err, result2) => {
          if (err) {
            console.log(err);
          } else {
            /* Object.keys(result2).forEach(function (key) {
              var row2 = result2[key];
              var obj = {
                stampId: row.stamp_id,
                stampDate: row.stamp_date,
                workShiftId: row2.work,
                workHours: row.workhours,
                stampLate: row.stamp_late,
                stampOt: row.stamp_ot,
                stampBefore: row.stamp_before,
              };
              //console.log(obj);
              data.push(obj);
            });
            console.log(data);
            res(nill, data); */
            /*
            async.eachSeries(
              result2,
              function (items, callback) {
                var obj = {
                  stampId: row.stamp_id,
                  stampDate: row.stamp_date,
                  workShiftId: items.work,
                  workHours: row.workhours,
                  stampLate: row.stamp_late,
                  stampOt: row.stamp_ot,
                  stampBefore: row.stamp_before,
                };

                data.push(obj);
                console.log(data);
              },
              function done() {
                // console.log("data:", data);
                // res(null, data);
              }
            );*/
          }
        });
      });
      //console.log(data);
      res(null, data);
    }
  });
};

module.exports = Report;
