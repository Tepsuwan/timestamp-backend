const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const async = require("async");
router.use(bodyParser.json());
const connection = require("../db/database");

const LoadHolidays = function (loadHolidays) {};

LoadHolidays.getAll = (req, res) => {
  var uid = req.query.uid;
  var year = req.query.year;

  //console.log(req.query);
  var data = [];
  const sql =
    "SELECT reason_id,reason_day,reason_name FROM bz_timestamp.t_reason WHERE 1";
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      //console.log(result.length);
      async.eachSeries(
        result,
        function (items, callback) {
          //console.log(items);
          const sql2 =
            "SELECT count(reason_id) as reason FROM bz_timestamp.t_stamp WHERE stamp_uid='" +
            uid +
            "' and reason_id='" +
            items.reason_id +
            "' and year(stamp_date)='" +
            year +
            "' and is_delete=0";
          connection.query(sql2, function (err, result2) {
            if (err) {
              console.log(err);
            } else {
              reason = result2[0].reason;

              var obj = {
                reason_id: items.reason_id,
                reason_name: items.reason_name,
                reason_day: items.reason_day,
                reason_use: reason,
                reason_balance: items.reason_day - reason,
              };
              data.push(obj);
            }
            callback();
          });
        },
        function done() {
          //console.log("data:", data);
          res(null, data);
        }
      );
    }
  });
};

module.exports = LoadHolidays;
