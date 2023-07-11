const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const connection = require("../db/database");

const LoadWotkShift = function (loadWorkShift) {};
LoadWotkShift.getAll = (req, res) => {
  data = [];
  const query =
    "SELECT work_shift_id as value,CASE work_shift_start " +
    "WHEN 'none' then 'none' " +
    "WHEN 'OT' then 'OT' " +
    "ELSE concat(`work_shift_start`,'-', `work_shift_stop`)" +
    "END as text" +
    " FROM bz_timestamp.t_work_shift" +
    " WHERE 1 " +
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
