const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const connection = require("../db/database");

const GetWorkShift = function (getWorkShift) {};

GetWorkShift.getAll = (req, res) => {
  workShiftId = req.query.workShiftId;
  //console.log(workShiftId);
  const query =
    "SELECT work_shift_id as value," +
    " if(work_shift_start='none',work_shift_start," +
    " concat(work_shift_start,'-', work_shift_stop)) as text" +
    " FROM bz_timestamp.t_work_shift" +
    " WHERE work_shift_id='" +
    workShiftId +
    "' " +
    " ORDER BY work_shift_start ASC";

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //console.log(result);
      console.log("Get WorkShift Success");
      res(null, result);
    }
  });
};

module.exports = GetWorkShift;
