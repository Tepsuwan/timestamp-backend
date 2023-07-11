const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const connection = require("../db/database");

const Team = function (team) {};

Team.getAll = (req, res) => {
  //var team = req.query.team;
  var data = [];
  const query =
    "SELECT distinct Team" +
    " FROM baezenic_people.t_people" +
    " WHERE 1 AND status<>'Y' ";

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        var obj = {
          text: row.Team,
          value: row.Team,
        };
        data.push(obj);
      });
      console.log("Load team name success");
      res(null, data);
    }
  });
};

module.exports = Team;
