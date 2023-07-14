const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const connection = require("../db/database");

const UserData = function (userData) {};

UserData.getAll = (req, res) => {
  var uid = req.query.uid;
  //console.log(uid);
  const query =
    "SELECT " +
    " p.id,concat(p.titlename,' ',p.Name,' (',p.NickName,')') as fname," +
    " p.NickName,p.Office,p.Email,p.Main_Team as Team,p.Office," +
    " CASE c.work_shift_start" +
    " WHEN 'none' then '-'" +
    " WHEN 'OT' then '-'" +
    " ELSE concat(c.work_shift_start,'-', c.work_shift_stop)" +
    " END as staff_work_shift" +
    " FROM baezenic_people.t_people p " +
    " LEFT JOIN bz_timestamp.t_employee_time b ON b.uid=p.id" +
    " LEFT JOIN bz_timestamp.t_work_shift c ON c.work_shift_id=b.work_shift_id" +
    " WHERE p.status<>'Y' " +
    " AND p.id='" +
    uid +
    "'";
  connection.query(query, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      //console.log(result);
      Object.keys(result).forEach(function (key) {
        var row = result[key];

        var data = {
          id: row.id,
          name: row.fname,
          nickname: row.NickName,
          email: row.Email,
          team: row.Team,
          office: row.Office,
          workshift: row.staff_work_shift,
        };
        console.log("Load UserData Success");
        res(null, data);
      });
    }
  });
};

module.exports = UserData;
