const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const connection = require("../db/database");

const CalendarUser = function (calendarUser) {};

CalendarUser.getAll = (req, res) => {
  var data = [];
  var uid = req.query.uid;
  var team = req.query.team;
  const query = `SELECT team FROM baezenic_people.t_people WHERE id= '${uid}'`;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //team = result[0].team;
      //console.log(query);
      const sql =
        "SELECT " +
        " p.id,p.NickName as name" +
        " FROM baezenic_people.t_people p " +
        " LEFT JOIN bz_timestamp.t_employee_time u ON u.uid=p.id" +
        " WHERE p.status<>'Y' AND p.Team='" +
        team +
        "' AND  p.Office<>'Vietnam' AND is_operator=1" +
        " ORDER BY p.id ASC";

      connection.query(sql, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("CalendarUser load success.");
          res(null, {
            data: result,
          });
        }
      });
    }
  });
};

module.exports = CalendarUser;
