const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const connection = require("../db/database");

const LoadWotkShift = function (loadWorkShift) {};
LoadWotkShift.getAll = (req, res) => {
  data = [];
  const query =
    "SELECT @rownum := @rownum + 1 AS rownum," +
    "work_shift_id as id,work_shift_start,work_shift_stop" +
    " FROM bz_timestamp.t_work_shift" +
    " ,(SELECT @rownum := 0) r" +
    " WHERE 1" +
    " ORDER BY work_shift_start ASC";

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //console.log("data: ", result);
      res(null, { data: result });
    }
  });
};

module.exports = LoadWotkShift;
