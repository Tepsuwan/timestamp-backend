const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const connection = require("../db/database");

const GetWorkShift = function (getWorkShift) {};

GetWorkShift.getAll = (req, res) => {
  const query =
    "SELECT @rownum := @rownum + 1 AS rownum," +
    " a.stamp_id as id, concat(b.Name ,' (',b.NickName,')') as stamp_uid," +
    " DATE_FORMAT(a.stamp_date,'%d/%m/%Y') as stamp_date," +
    " if(a.stamp_start='0000-00-00 00:00:00','',DATE_FORMAT(a.stamp_start,'%H:%i:%s')) as stamp_start ," +
    " if(a.stamp_stop='0000-00-00 00:00:00','',DATE_FORMAT(a.stamp_stop,'%H:%i:%s')) as stamp_stop," +
    " a.stamp_stop_ip, d.reason_name as reason_id,a.stamp_start_ip ,a.stamp_note" +
    " FROM bz_timestamp.t_stamp a " +
    " LEFT JOIN baezenic_people.t_people b " +
    " ON CONVERT(b.id USING utf8) = CONVERT(a.stamp_uid USING utf8)" +
    " LEFT JOIN bz_timestamp.t_reason d ON d.reason_id=a.reason_id" +
    ",(SELECT @rownum := 0) r" +
    " WHERE a.is_delete=1";

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //console.log(result);
      res(null, result);
    }
  });
};

module.exports = GetWorkShift;
