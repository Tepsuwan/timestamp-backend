const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const moment = require("moment");
const async = require("async");
const crypto = require("crypto");
router.use(bodyParser.json());
const connection = require("../db/database");

const LoadStamps = function (loadStamps) {};

LoadStamps.getAll = (req, result) => {
  var uid = req.query.uid;
  var start = req.query.start;
  var end = req.query.end;

  // console.log(req.headers);
  // console.log(req.query);

  let data = [];
  let arr = [];

  for (
    var day = moment(start);
    day.diff(end, "days") <= 0;
    day.add(1, "days")
  ) {
    var date = day.format(`YYYY-MM-DD`);
    arr.push(date);
  }
  async.eachSeries(
    arr,
    function iterator(item, callback) {
      d = moment(item);
      //console.log(item);
      days = d.format(`dddd`);
      date2 = d.format(`DD/MM/YYYY`);

      const query = `SELECT a.stamp_id, DATE_FORMAT(a.stamp_date,'%d/%m/%Y') as stamp_date,
                 if(a.stamp_start='0000-00-00 00:00:00','',DATE_FORMAT(a.stamp_start,'%H:%i:%s')) as stamp_start,
                 a.stamp_start_ip,
                 if(a.stamp_stop='0000-00-00 00:00:00','',DATE_FORMAT(a.stamp_stop,'%H:%i:%s')) as stamp_stop,
                 a.stamp_stop_ip, a.stamp_note,c.reason_name as reason_id
                 FROM bz_timestamp.t_stamp a
                 INNER JOIN baezenic_people.t_people b ON CONVERT(b.id USING utf8)=CONVERT(a.stamp_uid USING utf8)
                 LEFT JOIN bz_timestamp.t_reason c ON c.reason_id=a.reason_id
                 WHERE a.stamp_uid='${uid}' AND a.is_delete=0
                 AND DATE_FORMAT(a.stamp_date,'%Y-%m-%d') ='${item}'
                 ORDER BY a.stamp_date DESC`;
      connection.query(query, function (err, results) {
        if (err) {
          console.log(err);
        } else {
          var num_rows = results.length;
          if (num_rows > 0) {
            Object.keys(results).forEach(function (key) {
              var row = results[key];
              var obj = {
                stamp_uid: row.stamp_uid,
                stamp_id: row.stamp_id,
                stamp_day: days,
                stamp_date: date2,
                stamp_start: row.stamp_start,
                stamp_stop: row.stamp_stop,
                reason_id: row.reason_id,
                stamp_note: row.stamp_note,
              };
              data.push(obj);
            });
          } else {
            const stamp_id = crypto.randomBytes(6).toString("hex");

            var obj = {
              stamp_uid: uid,
              stamp_id: stamp_id,
              stamp_day: days,
              stamp_date: date2,
            };
            data.push(obj);
          }
        }
        callback();
      });
    },
    function done() {
      result(null, data);
      // console.log("data:", data);
    }
  );
};

module.exports = LoadStamps;
