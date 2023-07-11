const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const connection = require("../db/database");

const WorkTimeAll = function (workTimeAll) {};

WorkTimeAll.getAll = (req, res) => {
  var team = req.query.team;
  var data = [];

  var sql =
    "SELECT work_shift_id, " +
    " CASE work_shift_start" +
    " WHEN 'none' then 'none'" +
    " WHEN 'OT' then 'OT'" +
    " ELSE concat(`work_shift_start`,'-', `work_shift_stop`)" +
    " END as staff_work_shift" +
    " FROM bz_timestamp.t_work_shift WHERE 1 ORDER BY work_shift_start ASC";

  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      var sql2 =
        "SELECT @rownum := @rownum + 1 AS rownum," +
        "p.id,CONCAT(p.titlename,' ',Name,' ( ',p.NickName,' )') as name,u.work_shift_id as work_time,u.is_operator as access,p.Team as team " +
        "FROM baezenic_people.t_people p " +
        "LEFT JOIN bz_timestamp.t_employee_time u ON u.uid=p.id " +
        ",(SELECT @rownum := 0) r " +
        "WHERE status<>'Y' AND Office!='Vietnam' ";
      if (team != "All") {
        sql2 += " AND p.Team='" + team + "' ";
      }
      sql += " ORDER BY p.id ASC";

      connection.query(sql2, (err2, result2) => {
        if (err2) {
          console.log(err2);
        } else {
          Object.keys(result2).forEach(function (key) {
            var row2 = result2[key];
            var obj = {
              rownum: row2.rownum,
              id: row2.id,
              name: row2.name,
              access: row2.access,
              workTime: row2.work_time,
              team: row2.team,
              shift: result,
            };
            data.push(obj);
          });
        }
        console.log("Load work time success");
        res(null, { data: data });
      });
    }
  });
  /*
  var sql2 =
    "SELECT @rownum := @rownum + 1 AS rownum," +
    "p.id,CONCAT(p.titlename,' ',Name,' ( ',p.NickName,' )') as name,u.work_shift_id as work_time,u.is_operator as access,p.Team as team " +
    "FROM baezenic_people.t_people p " +
    "LEFT JOIN bz_timestamp.t_employee_time u ON u.uid=p.id " +
    ",(SELECT @rownum := 0) r " +
    "WHERE status<>'Y' AND Office!='Vietnam' ";
  if (team != "All") {
    sql2 += " AND p.Team='" + team + "' ";
  }
  sql += " ORDER BY p.id ASC";

  console.log(sql2);
  connection.query(sql2, (err2, result2) => {
    if (err2) {
      console.log(err2);
    } else {
      console.log(result2);
    }
  });
  */
};

module.exports = WorkTimeAll;
