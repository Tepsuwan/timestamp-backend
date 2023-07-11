const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const connection = require("../db/database");

const ReasonSetting = function (reasonSetting) {};

ReasonSetting.getAll = (req, res) => {
  const query =
    "SELECT @rownum := @rownum + 1 AS rownum," +
    "reason_id as id,reason_name,reason_day" +
    " FROM bz_timestamp.t_reason" +
    " ,(SELECT @rownum := 0) r" +
    " WHERE 1";

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //console.log(result);
      res(null, result);
    }
  });
};

module.exports = ReasonSetting;
