const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const connection = require("../db/database");
const async = require("async");
var currentDate = new Date();

const LoadOnline = function (loadOnline) {};

LoadOnline.getAll = (req, res) => {
  var fDate = req.query.fDate;
  var tDate = req.query.tDate;

  var data = [];
  const sql =
    "SELECT DATE_FORMAT(a.stamp_date,'%Y-%m-%d') as date, DATE_FORMAT(a.stamp_date,'%d/%m/%Y') as stamp_date" +
    " FROM bz_timestamp.t_stamp a" +
    " INNER JOIN baezenic_people.t_people b ON CONVERT(b.id USING utf8) = CONVERT(a.stamp_uid USING utf8)" +
    " LEFT JOIN bz_timestamp.t_late c ON c.stamp_id = a.stamp_id" +
    " LEFT JOIN bz_timestamp.t_reason f ON f.reason_id = a.reason_id" +
    " LEFT JOIN bz_timestamp.t_work_shift g ON g.work_shift_id = a.work_shift_id" +
    " WHERE a.is_delete = 0 and b.status<>'Y'" +
    " AND DATE_FORMAT(a.stamp_date, '%Y-%m-%d') BETWEEN '" +
    fDate +
    "' AND '" +
    tDate +
    "'" +
    "GROUP BY a.stamp_date ORDER BY a.stamp_date ASC";
  //console.log(sql);
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      async.each(
        result,
        function (items, cb) {
          const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          var date = items.date;
          var day = weekday[currentDate.getDay()];
          async.waterfall(
            [
              function (callback) {
                const sql2 =
                  "SELECT a.id, a.uid,concat(b.titlename,b.Name,' ( ',b.NickName,' )') as uname, a.work_shift_id, a.is_operator" +
                  " FROM bz_timestamp.t_employee_time a" +
                  " INNER JOIN baezenic_people.t_people b ON CONVERT(b.id USING utf8) = CONVERT(a.uid USING utf8) " +
                  " WHERE a.is_operator=1 and b.status<>'Y' " +
                  " ORDER BY b.Name ASC";
                connection.query(sql2, function (err, result2) {
                  if (err) {
                    console.log(err);
                  } else {
                    //console.log(result2);
                    callback(null, result2);
                  }
                });
              },

              function (result2, callback) {
                if (result2.length == 0) {
                  return callback(null);
                } else {
                  // arg1 now equals 'one' and arg2 now equals 'two'
                  //callback(null, "three");
                  async.each(
                    result2,
                    function (row, next) {
                      var dt = {
                        uid: row.uid,
                        uname: row.uname,
                      };
                      const sql3 =
                        "SELECT b.stamp_id, DATE_FORMAT(b.stamp_date,'%d/%m/%Y') as stamp_date,DATE_FORMAT(b.stamp_date,'%a') as dText," +
                        " concat(c.titlename,c.Name ,' (',c.NickName,')') as stamp_uid," +
                        " if(b.stamp_start='0000-00-00 00:00:00','',DATE_FORMAT(b.stamp_start,'%H:%i:%s')) as stamp_start," +
                        " b.stamp_start_ip," +
                        " if(b.stamp_stop='0000-00-00 00:00:00','',DATE_FORMAT(b.stamp_stop,'%H:%i:%s')) as stamp_stop," +
                        " b.stamp_stop_ip,b.stamp_note,g.reason_name as reason_id" +
                        " FROM bz_timestamp.t_stamp b" +
                        " INNER JOIN baezenic_people.t_people c ON CONVERT(c.id USING utf8) = CONVERT(b.stamp_uid USING utf8) " +
                        " LEFT JOIN bz_timestamp.t_reason g ON g.reason_id = b.reason_id" +
                        " WHERE b.is_delete = 0 and c.status<>'Y' " +
                        " AND b.stamp_uid = '" +
                        dt.uid +
                        "'" +
                        " AND DATE_FORMAT(b.stamp_date, '%Y-%m-%d') = '" +
                        date +
                        "'  ";
                      connection.query(sql3, function (err, result3) {
                        if (err) {
                          return next(err);
                        }
                        if (result3.length > 0) {
                          //for (var i3 = 0; i3 < result3.length; i3++) {
                          data.push(result3[0]);
                          // }
                        } else {
                          if (day != "Sat" && day != "Sun") {
                            data.push({ stamp_uid: dt.uname });
                          }
                        }
                        next(null);
                      });
                    },
                    function (err) {
                      if (err) {
                        console.log(err);
                      } else {
                        //console.log(err, " END step 2 ");
                        callback(null, null);
                      }
                    }
                  ); // end async.each(
                }
              },
              function (arg1, callback) {
                // arg1 now equals 'three'
                callback(null, "done");
              },
            ],
            function (err, result) {
              // result now equals 'done'
              //console.log("End waterfall ", result);
              cb(err);
            }
          );
        },
        function (err) {
          if (err) {
            console.log(err);
          } else {
            res(null, data);
            //console.log("data :", data);
          }
        }
      ); //
    }
  });
};

module.exports = LoadOnline;
