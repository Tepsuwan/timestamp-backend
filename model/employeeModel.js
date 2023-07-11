const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const connection = require("../db/database");

const CalendarUser = function (calendarUser) {};

CalendarUser.getAll = (req, res) => {
  const query =
    "SELECT @rownum := @rownum + 1 AS rownum," +
    "p.id,CONCAT(p.titlename,' ',Name,' ( ',p.NickName,' )') as Name,u.work_shift_id,u.is_operator,p.Main_Team as Team,p.status" +
    " FROM baezenic_people.t_people p " +
    " LEFT JOIN bz_timestamp.t_employee_time u ON u.uid=p.id" +
    " ,(SELECT @rownum := 0) r" +
    " WHERE status<>'Y' AND (sub_office='PTY' or sub_office='BKK' or sub_office='BZID')" +
    " ORDER BY p.id ASC";

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //console.log(result);
      res(null, { data: result });
    }
  });
};

module.exports = CalendarUser;
