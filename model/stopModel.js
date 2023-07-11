const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const moment = require("moment");
const crypto = require("crypto");
router.use(bodyParser.json());
const connection = require("../db/database");
const { ok } = require("assert");

const date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
const Start = function (start) {};

function hoursToMinutes(Hours) {
  var timeParts = Hours.split(":");
  return Number(timeParts[0]) * 60 + Number(timeParts[1]);
}
Start.getAll = (req, res) => {
  let Current = moment();
  let CurrentDate = Current.format(`YYYY-MM-DD HH:mm:ss`);
  var uid = req.body.uid;
  var stamp_start_ip = req.body.start_ip;
  var d = req.body.d;

  const query = `SELECT a.stamp_id, DATE_FORMAT(a.stamp_date,'%d/%m/%Y') as stamp_date,
    if(a.stamp_start='0000-00-00 00:00:00','',DATE_FORMAT(a.stamp_start,'%H:%i:%s')) as stamp_start,
    a.stamp_start_ip,
    if(a.stamp_stop='0000-00-00 00:00:00','',DATE_FORMAT(a.stamp_stop,'%H:%i:%s')) as stamp_stop,
    a.stamp_stop_ip, a.stamp_note,c.reason_name as reason_id
    FROM bz_timestamp.t_stamp a
    INNER JOIN baezenic_people.t_people b ON CONVERT(b.id USING utf8)=CONVERT(a.stamp_uid USING utf8)
    LEFT JOIN bz_timestamp.t_reason c ON c.reason_id=a.reason_id
    WHERE a.stamp_uid='${uid}' AND a.is_delete=0
    AND DATE_FORMAT(a.stamp_date,'%Y-%m-%d') ='${d}'
    ORDER BY a.stamp_date DESC`;

  connection.query(query, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      Object.keys(results).forEach(function (key) {
        var row = results[key];
        const query =
          "UPDATE bz_timestamp.t_stamp SET " +
          "stamp_stop ='" +
          CurrentDate +
          "'," +
          "stamp_stop_ip ='" +
          stamp_start_ip +
          "'," +
          "update_user ='" +
          uid +
          "'," +
          "update_date ='" +
          CurrentDate +
          "'" +
          " WHERE stamp_id ='" +
          row.stamp_id +
          "' and stamp_uid ='" +
          uid +
          "'";
        console.log(query);
        connection.query(query, function (err, result) {
          if (err) {
            res.send({ success: false });
            console.log(err);
          } else {
            console.log("Stop : " + CurrentDate);
            console.log("Update success");
            res(null, "stop success");
          }
        });
      });
    }
  });
};

module.exports = Start;
