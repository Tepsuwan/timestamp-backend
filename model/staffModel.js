const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const connection = require("../db/database");

const Staff = function (staff) {};

Staff.getAll = (req, res) => {
  var team = req.query.team;
  data = [];
  var query =
    "SELECT a.id,  concat(a.titlename, a.Name, '(',a.NickName,')') as name,  a.Team" +
    " FROM baezenic_people.t_people a" +
    " INNER JOIN bz_timestamp.t_employee_time b ON b.uid=a.id" +
    " WHERE a.status<>'Y' AND a.Office<>'vietnam' AND b.is_operator=1";
  /*
  if (!isEmptyObject(team)) {
    query += " AND a.Team='$team'";
  }*/
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //console.log(result);
      console.log("Get staff success");
      res(null, result);
    }
  });
};

module.exports = Staff;
