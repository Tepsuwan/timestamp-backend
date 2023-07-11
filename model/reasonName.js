const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const connection = require("../db/database");

const UserData = function (userData) {};

UserData.getAll = (req, res) => {
  query =
    "SELECT `reason_name`  FROM bz_timestamp.t_reason WHERE 1 ORDER BY reason_name ASC";
  //console.log(query);
  connection.query(query, function (err, results) {
    let data = [];
    if (err) {
      console.log(err);
    } else {
      var num_rows = results.length;
      if (num_rows > 0) {
        Object.keys(results).forEach(function (key) {
          var row = results[key];
          var obj = row.reason_name;
          data.push(obj);
        });
        console.log(data);
        //res.json(data);
        res(null, data);
      }
    }
  });
};

module.exports = UserData;
