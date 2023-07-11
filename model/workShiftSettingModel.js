const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const connection = require("../db/database");
const crypto = require("crypto");

const UpdateWorkTime = function (updateWorkTime) {
  UpdateWorkTime.getAll = (req, res) => {
    var start = req.body.start;
    var stop = req.body.stop;
    var createUid = req.body.createUid;
    var createDate = req.body.createDate;
    const workShiftid = crypto.randomBytes(6).toString("hex");
    const query =
      "INSERT INTO t_work_shift(" +
      "work_shift_id, work_shift_start, work_shift_stop," +
      " create_uid, create_date" +
      ") VALUES (" +
      "'" +
      workShiftid +
      "','" +
      start +
      "','" +
      stop +
      "','" +
      createUid +
      "','" +
      createDate +
      "'" +
      ")";
  };
};

module.exports = UpdateWorkTime;
