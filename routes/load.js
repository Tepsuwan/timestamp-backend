const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const moment = require("moment");
const async = require("async");
const crypto = require("crypto");
router.use(bodyParser.json());
const connection = require("../db/database");
const { ok } = require("assert");

const date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
const dateNow = year + "-" + month + "-" + date;
const timeNow = year + "-" + month + "-" + date;
const dateShow = date + "-" + month + "-" + year;
var currentDate = new Date();
var currentYear = currentDate.getFullYear();
var currentMonth = currentDate.getMonth() + 1;

function update_late() {
  var extra_dayshift_id = "";
  var extra_work_start = "";
  var extra_work_stop = "";

  var stamp_date = "";
  var stamp_start = "";
  var stamp_stop = "";
  var hours = "";
  var dateNow = year + "-" + month + "-" + date;
  var Current = moment();
  var CD = Current.format(`YYYY-MM-DD HH:mm:ss`);
  const query =
    "SELECT if(x1.d is null,x2.work_shift_id,x1.work_shift_id) as work_shift_id, " +
    "if(x1.d is null,x2.work_shift_start,x1.work_shift_start) as work_shift_start,if(x1.d is null,x2.work_shift_stop,x1.work_shift_stop) as work_shift_stop " +
    "FROM bz_timestamp.t_extra_dayshift a " +
    "INNER JOIN bz_timestamp.t_work_shift b ON a.work_shift_id=b.work_shift_id " +
    "LEFT JOIN( " +
    "   SELECT a.uid, a.date as d,a.work_shift_id,b.work_shift_start,b.work_shift_stop " +
    "   FROM bz_timestamp.t_extra_dayshift a " +
    "   INNER JOIN bz_timestamp.t_work_shift b ON a.work_shift_id=b.work_shift_id " +
    "   WHERE a.uid='" +
    obj.uid +
    "' and a.status=0 and date='" +
    obj.dateNow +
    "' order by a.date " +
    ") as x1 on x1.uid=a.uid " +
    "LEFT JOIN( " +
    "   SELECT a.uid, a.days as d,a.work_shift_id,b.work_shift_start,b.work_shift_stop " +
    "   FROM bz_timestamp.t_extra_dayshift a " +
    "   INNER JOIN bz_timestamp.t_work_shift b ON a.work_shift_id=b.work_shift_id " +
    "   WHERE a.uid='" +
    obj.uid +
    "' and a.status=0 and days='" +
    obj.day +
    "' order by a.date " +
    ") as x2 on x2.uid=a.uid " +
    "WHERE a.uid='" +
    obj.uid +
    "' and a.status=0 group by a.uid";

  connection.query(query, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      numRows = result.length;
      if (numRows > 0) {
        extra_dayshift_id = result3[0].work_shift_id;
        extra_work_start = result3[0].work_shift_start;
        extra_work_stop = result3[0].work_shift_stop;
      }
      //if t_late have data get new work_shift_id----------------------------

      const query =
        "SELECT b.work_shift_start,b.work_shift_stop,b.work_shift_id" +
        " FROM bz_timestamp.t_late a" +
        " LEFT JOIN bz_timestamp.t_work_shift b ON b.work_shift_id=a.stamp_shift " +
        " WHERE a.stamp_id='" +
        obj.stamp_id +
        "'";

      //console.log(query);
      connection.query(query, function (err, result2) {
        if (err) {
          console.log(err);
        } else {
          let num_rows = result2.length;
          let late_start = "";
          let late_stop = "";
          let late_work_shift_id = "";

          if (num_rows > 0) {
            late_work_shift_id = result2[0].work_shift_id;
          }
          const query =
            "SELECT a.stamp_date,DATE_FORMAT(a.stamp_start,'%Y-%m-%d %H:%i:%s') as start," +
            " DATE_FORMAT(a.stamp_stop,'%Y-%m-%d %H:%i:%s') as stop,b.work_shift_start,b.work_shift_stop,b.work_shift_id" +
            " FROM bz_timestamp.t_stamp a" +
            " LEFT JOIN bz_timestamp.t_work_shift b ON b.work_shift_id=a.work_shift_id " +
            " WHERE a.stamp_id='" +
            obj.stamp_id +
            "'";
          //console.log(query);
          connection.query(query, function (err, result) {
            if (err) {
              console.log(err);
            } else {
              stamp_date = result[0].stamp_date;
              stamp_date = moment(stamp_date);
              stamp_date = stamp_date.format(`YYYY-MM-DD`);

              stamp_start = result[0].start;
              stamp_start = moment(stamp_start);
              stamp_start = stamp_start.format(`HH:mm`);

              stamp_stop = result[0].stop;
              //stamp_start = moment(stamp_stop);
              if (stamp_stop == "0000-00-00 00:00:00") {
                stamp_stop = `00:00`;
              } else {
                stamp_stop = result[0].stop;
                stamp_start = moment(stamp_stop);
                stamp_start = stamp_start.format(`HH:mm`);
              }
              //console.log(result);

              if (late_work_shift_id == "") {
                //late
                if (extra_dayshift_id != "") {
                  //extra dayshift
                  work_shift_start = $extra_work_start;
                  work_shift_stop = $extra_work_stop;
                  work_shift_id = $extra_dayshift_id;
                } else {
                  work_shift_start = result[0].work_shift_start;
                  work_shift_stop = result[0].work_shift_stop;
                  work_shift_id = result[0].work_shift_id;
                }
              } else {
                if (extra_dayshift_id != "") {
                  //extra dayshif
                  work_shift_start = extra_work_start;
                  work_shift_stop = extra_work_stop;
                  work_shift_id = extra_dayshift_id;
                } else {
                  work_shift_start = result2[0].work_shift_start;
                  work_shift_stop = result2[0].work_shift_stop;
                  work_shift_id = result2[0].work_shift_id;
                }
              }

              if (stamp_start <= work_shift_start) {
                //08:00 work_shift_start
                start_time = moment(result[0].work_shift_start).format(
                  `YYYY:MM:DD`
                );
              } else {
                //stamp_start
                start_time = result[0].start;
              }

              finish_time = CD;
              date = moment(start_time);
              now = moment(finish_time);
              var duration = moment.duration(now.diff(date));
              var hours = parseInt(duration.asHours());
              var minutes = parseInt(duration.asMinutes()) % 60;
              hours = hours + ":" + minutes;
              hours = hoursToMinutes(hours) - 60;
              //get late ot-------------------------------------------------------
              if (work_shift_start == "none") {
                json = array({ success: true });
              }
              Late = durationMinute(work_shift_start, stamp_start);
              Overtime = durationMinute(work_shift_stop, stamp_stop);
              Before = durationBefore(stamp_stop, work_shift_stop);

              if (Before < 0) {
                Before = "";
              }
              /* update t_late---------------------------------------------------- */

              const sql =
                "SELECT stamp_id FROM bz_timestamp.t_late WHERE stamp_id='" +
                obj.stamp_id +
                "'";
              connection.query(sql, function (err, result) {
                if (err) {
                  console.log(err);
                } else {
                  var num_rows = result.length;
                  late_id = crypto.randomBytes(6).toString("hex");
                }
                if (num_rows == 0) {
                  if (obj.action == "start") {
                    const sql =
                      "INSERT INTO bz_timestamp.t_late" +
                      "(" +
                      "late_id, stamp_id,stamp_uid,stamp_date,stamp_shift,late" +
                      ") VALUES (" +
                      "'" +
                      late_id +
                      "','" +
                      obj.stamp_id +
                      "'," +
                      "'" +
                      obj.uid +
                      "','" +
                      obj.dateNow +
                      "'," +
                      "'" +
                      obj.wsid +
                      "','" +
                      Late +
                      "'" +
                      ")";

                    connection.query(sql, function (err, result) {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log("1");
                      }
                    });
                  } else {
                    const sql =
                      "INSERT INTO bz_timestamp.t_late" +
                      "(" +
                      "late_id, stamp_id,stamp_uid,stamp_date, stamp_shift,late,overtime,before_time,hours" +
                      ") VALUES (" +
                      "'" +
                      late_id +
                      "','" +
                      obj.stamp_id +
                      "'," +
                      "'" +
                      obj.uid +
                      "','" +
                      obj.dateNow +
                      "'," +
                      "'" +
                      obj.wsid +
                      "','" +
                      Late +
                      "'," +
                      "'" +
                      Overtime +
                      "','" +
                      Before +
                      "','" +
                      hours +
                      "'" +
                      ")";

                    connection.query(sql, function (err, result2) {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log("2");
                      }
                    });
                  }
                } else {
                  if (obj.action == "start") {
                    const sql =
                      "UPDATE bz_timestamp.t_late SET " +
                      "stamp_shift='" +
                      obj.wsid +
                      "'," +
                      "late='" +
                      Late +
                      "'" +
                      "WHERE stamp_id='" +
                      obj.stamp_id +
                      "'";
                    console.log(sql);
                    connection.query(query, function (err, result3) {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log("3");
                      }
                    });
                  } else {
                    const sql =
                      "UPDATE bz_timestamp.t_late SET " +
                      "stamp_shift='" +
                      obj.wsid +
                      "'," +
                      "late='" +
                      Late +
                      "'," +
                      "overtime='" +
                      Overtime +
                      "'," +
                      "before_time='" +
                      Before +
                      "'," +
                      "hours='" +
                      hours +
                      "' " +
                      "WHERE stamp_id='" +
                      obj.stamp_id +
                      "'";

                    connection.query(sql, function (err, result4) {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log("4");
                      }
                    });
                  }
                }
              });
            }
          });
        }
      });
    }
  });
}
function mysql_real_escape_string(str) {
  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
    switch (char) {
      case "\0":
        return "\\0";
      case "\x08":
        return "\\b";
      case "\x09":
        return "\\t";
      case "\x1a":
        return "\\z";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case '"':
      case "'":
      case "\\":
      case "%":
        return "\\" + char;
    }
  });
}

function durationMinute(begin, end) {
  var timeParts = begin.split(":");
  var timeParts = Number(timeParts[0]) * 60 + Number(timeParts[1]);
  var timeParts2 = end.split(":");
  var timeParts2 = Number(timeParts2[0]) * 60 + Number(timeParts2[1]);
  var hminute = timeParts2 - timeParts;

  return hminute;
}

function durationBefore(begin, end) {
  var timeParts = begin.split(":");
  var timeParts = Number(timeParts[0]) * 60 + Number(timeParts[1]);
  var timeParts2 = end.split(":");
  var timeParts2 = Number(timeParts2[0]) * 60 + Number(timeParts2[1]);
  var hminute = timeParts2 - timeParts;
  if (hminute < 0) {
    hminute = hminute * -1;
  }
  return hminute;
}

function hoursToMinutes(Hours) {
  var timeParts = Hours.split(":");
  return Number(timeParts[0]) * 60 + Number(timeParts[1]);
}

router.get("/userdata", async (req, res) => {
  let uid = req.query.uid;

  const query =
    "SELECT " +
    " p.id,concat(p.titlename,' ',p.Name,' (',p.NickName,')') as fname," +
    " p.NickName,p.Office,p.Email,p.Main_Team as Team,p.Office," +
    " CASE c.work_shift_start" +
    " WHEN 'none' then '-'" +
    " WHEN 'OT' then '-'" +
    " ELSE concat(c.work_shift_start,'-', c.work_shift_stop)" +
    " END as staff_work_shift" +
    " FROM baezenic_people.t_people p " +
    " LEFT JOIN bz_timestamp.t_employee_time b ON b.uid=p.id" +
    " LEFT JOIN bz_timestamp.t_work_shift c ON c.work_shift_id=b.work_shift_id" +
    " WHERE p.status<>'Y' " +
    " AND p.id='" +
    uid +
    "'";
  connection.query(query, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      //console.log(result);
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        var data = {
          id: row.id,
          name: row.fname,
          nickname: row.NickName,
          email: row.Email,
          team: row.Team,
          office: row.Office,
          workshift: row.staff_work_shift,
        };
        //console.log(data);
        res.json({ data: data });
      });
    }
  });
});

router.get("/loadstamp", async (req, res) => {
  var uid = req.query.uid;
  var start = req.query.start;
  var end = req.query.end;

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
      //console.log("data:", data);
      res.status(200).json({
        data: data,
      });
    }
  );
});

router.get("/loadeonline", async (req, res) => {
  fDate = req.query.fDate;
  tDate = req.query.tDate;

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

  connection.query(sql, function (err, result) {
    console.log(err);
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
            console.log("data :", data);
            res.status(200).json({
              data: data,
            });
          }
        }
      ); //
    }
  });
});

router.get("/loadholidays", async (req, res) => {
  var uid = req.body.uid;
  var year = req.body.year;

  var data = [];
  const sql =
    "SELECT reason_id,reason_day,reason_name FROM bz_timestamp.t_reason WHERE 1";
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      async.eachSeries(
        result,
        function (items, callback) {
          //console.log(items.reason_id);
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
              //console.log(result2[0].reason);
              reason = result2[0].reason;

              var obj = {
                reason_id: items.reason_id,
                reason_name: items.reason_name,
                reason_day: items.reason_day,
                reason_use: reason,
                reason_balance: items.reason_day - reason,
              };
              data.push(obj);
              //console.log(data);
            }
            callback();
          });
        },
        function done() {
          console.log("data:", data);
          res.status(200).json({
            data: data,
          });
        }
      );
    }
  });
});

router.post("/start", async (req, res) => {
  var currentDate = new Date();
  var work_shift_id = "";
  var note = "";
  var team = "";
  var calendar_mate_id = "";
  var workshiftId = "";
  var calendar_date_start = "";
  const { networkInterfaces } = require("os");
  var action = req.body.action;
  var wsid = req.body.work_shift_id;
  const nets = networkInterfaces();
  const results = Object.create(null); // Or just '{}', an empty object

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }
  ipAddresses = results.Ethernet[0];
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var day = weekday[currentDate.getDay()];
  var dateNow = year + "-" + month + "-" + date;
  var uid = req.body.uid;
  var Current = moment();
  var CD = Current.format(`YYYY-MM-DD HH:mm:ss`);
  var d = req.body.d;
  var stamp_id = crypto.randomBytes(6).toString("hex");
  const query =
    "SELECT if(x1.staff_work_shift is null,x2.work_shift_id,x1.work_shift_id) as work_shift_id " +
    "FROM bz_timestamp.t_extra_dayshift a " +
    "INNER JOIN bz_timestamp.t_work_shift b ON a.work_shift_id=b.work_shift_id " +
    "LEFT JOIN( " +
    "   SELECT a.uid, a.date as staff_work_shift,a.work_shift_id " +
    "   FROM bz_timestamp.t_extra_dayshift a " +
    "   INNER JOIN bz_timestamp.t_work_shift b ON a.work_shift_id=b.work_shift_id " +
    "   WHERE a.uid='" +
    uid +
    "' and a.status=0 and date='" +
    dateNow +
    "' order by a.date " +
    ") as x1 on x1.uid=a.uid " +
    "LEFT JOIN( " +
    "   SELECT a.uid, a.days as staff_work_shift,a.work_shift_id " +
    "   FROM bz_timestamp.t_extra_dayshift a " +
    "   INNER JOIN bz_timestamp.t_work_shift b ON a.work_shift_id=b.work_shift_id " +
    "   WHERE a.uid='" +
    uid +
    "' and a.status=0 and days='" +
    day +
    "' order by a.date " +
    ") as x2 on x2.uid=a.uid " +
    "WHERE a.uid='" +
    uid +
    "' and a.status=0 group by a.uid";

  //console.log(query);
  connection.query(query, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      var num_rows01 = result.length;
      //console.log(num_rows01);

      if (num_rows01 > 0) {
        work_shift_id =
          result[0].work_shift_id == "" || result[0].work_shift_id == NULL
            ? ""
            : result[0].work_shift_id;
      }
      //Day shift-----------------------------------------------------------
      let sql =
        "SELECT a.work_shift_id,a.team,a.calendar_mate_id " +
        "FROM bz_timestamp.t_calendar a " +
        "LEFT JOIN bz_timestamp.t_employee_time b ON b.work_shift_id=a.work_shift_id " +
        "WHERE a.uid='" +
        uid +
        "'" +
        "AND DATE_FORMAT(a.calendar_date_start,'%Y-%m-%d')<='" +
        dateNow +
        "' " +
        "AND DATE_FORMAT(a.calendar_date_end,'%Y-%m-%d')>='" +
        dateNow +
        "' ";
      connection.query(sql, function (err2, result2) {
        if (err) {
          console.log(err);
        } else {
          var num_rows02 = result2.length;
          if (num_rows02 > 0) {
            workshiftId = result2[0].work_shift_id;
            team = result2[0].team;
            calendar_mate_id = result2[0].calendar_mate_id;
          }
        }
        if (work_shift_id != "") {
          workshiftId = work_shift_id;
        }
        if (team == "PE") {
          calendar_date_start = "";
          if (
            workshiftId == "55c94bea93fbe" ||
            workshiftId == "560ceb1539095"
          ) {
            //09:00-16:00 55c94bea93fbe
            var sql =
              "SELECT a.calendar_date_start " +
              "FROM bz_timestamp.t_calendar a " +
              "WHERE a.uid='uid" +
              uid +
              "'" +
              "AND a.calendar_id='" +
              calendar_mate_id +
              "'";

            connection.query(sql, function (err, result3) {
              if (err) {
                console.log(err);
              } else {
                var num_rows03 = result3.length;
                if (num_rows03 > 0) {
                  calendar_date_start = moment(
                    result3[0].calendar_date_start
                  ).format(`DD/MM/YYYY`);
                }
              }
            });
          }
          note = "#Day shift " + calendar_date_start;
        }
        /* Extra day shift
          ------------------------------------------------------------------ */
        //var stamp_id = crypto.randomBytes(6).toString("hex");
        const query = `SELECT stamp_id FROM bz_timestamp.t_stamp WHERE stamp_date= '${d}'`;

        connection.query(query, function (err, result) {
          if (err) {
            console.log(err);
          } else {
            //console.log(result.lengt);
            var num_rows = result.length;
            //console.log(num_rows);
            if (num_rows > 0) {
              const query = `SELECT stamp_start FROM bz_timestamp.t_stamp WHERE stamp_date= '${d}'`;

              connection.query(query, function (err, result) {
                if (err) {
                  console.log(err);
                } else {
                  if (result[0].stamp_start === "0000-00-00 00:00:00") {
                    const query = `SELECT stamp_id FROM bz_timestamp.t_stamp WHERE stamp_date= '${d}'`;
                    connection.query(query, function (err, result) {
                      if (err) {
                        console.log(err);
                      } else {
                        // console.log(result[0].stamp_id);
                        const query =
                          "UPDATE bz_timestamp.t_stamp SET " +
                          "stamp_start='" +
                          CD +
                          "'," +
                          "stamp_stop_ip='" +
                          ipAddresses +
                          "'," +
                          "work_shift_id='" +
                          wsid +
                          "'," +
                          "update_user='" +
                          uid +
                          "'," +
                          "update_date='" +
                          CD +
                          "'" +
                          " WHERE stamp_id='" +
                          result[0].stamp_id +
                          "'";

                        connection.query(query, function (err, result) {
                          if (err) {
                            console.log(err);
                            res.json({ success: false });
                          } else {
                            if (result) {
                              var id_command = result[0].stamp_id;
                              update_late(action);
                              console.log("Update start success");
                              res.json(Array({ success: true }));
                            } else {
                              res.json(
                                Array({ success: false }),
                                (msg = "Unable to write to the database")
                              );
                            }
                          }
                        });
                      }
                    });
                  } else {
                    //update_late(action);
                    console.log("Duplicate start !!");
                    res.json((msg = "Duplicate start"));
                  }
                }
              });
            } else {
              const query =
                "INSERT INTO bz_timestamp.t_stamp(" +
                "stamp_id, stamp_uid,work_shift_id, stamp_date, stamp_start,stamp_note," +
                "stamp_start_ip, create_user, create_date" +
                ") VALUES (" +
                "'" +
                stamp_id +
                "','" +
                uid +
                "','" +
                wsid +
                "','" +
                dateNow +
                "','" +
                CD +
                "','" +
                note +
                "'," +
                "'" +
                ipAddresses +
                "','" +
                uid +
                "','" +
                CD +
                "'" +
                ")";
              connection.query(query, function (err, result) {
                if (err) {
                  console.log(err);
                } else {
                  if (result) {
                    obj = {
                      action: action,
                      uid: uid,
                      stamp_id: stamp_id,
                      wsid: wsid,
                      dateNow: dateNow,
                      day: day,
                    };
                    update_late(obj);
                    //update_late(stamp_id);
                    console.log("Insert time start success");
                    res.json(Array({ success: true }));
                  } else {
                    res.json(
                      Array({ success: false }),
                      (msg = "Unable to write to the database")
                    );
                  }
                }
              });
            }
          }
        });
      });
    }
  });
});

router.post("/stop", async (req, res) => {
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

        connection.query(query, function (err, result) {
          if (err) {
            res.send({ success: false });
            console.log(err);
          } else {
            console.log("Stop : " + CurrentDate);
            console.log("Update success");
            res.json("Update stop success.");
          }
        });
      });
    }
  });
});

router.post("/stampnote", async (req, res) => {
  let Current = moment();
  let CurrentDate = Current.format(`YYYY-MM-DD HH:mm:ss`);
  var d = req.body.d;
  var uid = req.body.uid;
  var stamp_date = req.body.stamp_date;
  var ddd = moment(stamp_date, "DD-MM-YYYY");
  var stampD = ddd.format(`YYYY-MM-DD`);

  var stamp_id = req.body.stamp_id;

  var stamp_reason = req.body.stamp_reason;
  var stamp_uid = req.body.stamp_uid;
  var stamp_note = req.body.stamp_note;
  var reason_id = req.body.reason_id;
  var reason = "";
  switch (reason_id) {
    case "":
      reason = "null";
      break;
    case "Sick":
      reason = "55c1d991f1584";
      break;
    case "Absent":
      reason = "55c1d9a55f5a5";
      break;
    case "Monkhood":
      reason = "55c1da03b23dd";
      break;
    case "Marry":
      reason = "55c1da1745e3b";
      break;
    case "Pregnant":
      reason = "55c1da1fce75d";
      break;
    case "Summer":
      reason = "577e07c2ddf40";
      break;
    case "New Year":
      reason = "577e07ed096e3";
      break;
    case "Maulid":
      reason = "5bea50b79ff47";
      break;
    case "Christmas":
      reason = "5c232d8f4e01d";
      break;
  }
  const query = `SELECT stamp_id FROM bz_timestamp.t_stamp WHERE stamp_id= '${stamp_id}'`;
  connection.query(query, function (err, results) {
    if (err) {
      console.log(err);
      res.send({ success: false });
    } else {
      const query = `SELECT stamp_id,stamp_uid FROM bz_timestamp.t_stamp WHERE stamp_date= '${stampD}'`;
      connection.query(query, function (err, results) {
        if (err) {
          console.log(err);
          res.send({ success: false });
        } else {
          console.log(results);
          var numRows = results.length;
          if (numRows > 0) {
            const query =
              "UPDATE bz_timestamp.t_stamp SET " +
              "stamp_note ='" +
              mysql_real_escape_string(stamp_note) +
              "'" +
              " WHERE stamp_id ='" +
              stamp_id +
              "'";
            connection.query(query, function (err, result) {
              if (err) {
                console.log(err);
              } else {
                console.log("Update reason success");
              }
            });

            query2 =
              "UPDATE bz_timestamp.t_stamp SET reason_id ='" +
              reason +
              "'" +
              " WHERE stamp_id ='" +
              stamp_id +
              "'";
            connection.query(query2, function (err, result) {
              if (err) {
                console.log(err);
                res.send({ success: false });
              } else {
                console.log("Update note success.");
                res.send({ success: true });
              }
            });
          } else {
            if (stamp_note != undefined) {
              const query = `INSERT INTO bz_timestamp.t_stamp(stamp_id, stamp_uid , stamp_date, stamp_note) 
            VALUES ('${stamp_id}','${stamp_uid}','${stampD}','${mysql_real_escape_string(
                stamp_note
              )}')`;
              connection.query(query, function (err, results) {
                if (err) {
                  console.log(err);
                  res.send({ success: false });
                } else {
                  console.log("Insert note sucscess");
                  res.json(results);
                }
              });
            } else {
              const query = `INSERT INTO bz_timestamp.t_stamp(stamp_id, stamp_uid , stamp_date, reason_id) 
            VALUES ('${stamp_id}','${stamp_uid}','${stampD}','${reason}')`;
              connection.query(query, function (err, results) {
                if (err) {
                  console.log(err);
                  res.send({ success: false });
                } else {
                  console.log("Insert reason success");
                  res.json(results);
                }
              });
            }
          }
        }
      });
    }
  });
});

router.get("/reasonname", async (req, res) => {
  query =
    "SELECT `reason_name`  FROM bz_timestamp.t_reason WHERE 1 ORDER BY reason_name ASC";

  connection.query(query, function (err, results) {
    let data = [];
    if (err) {
      console.log(err);
    } else {
      var num_rows = results.length;
      if (num_rows > 0) {
        Object.keys(results).forEach(function (key) {
          var row = results[key];
          var obj = row.reason_name;
          data.push(obj);
        });
        console.log(data);
        res.json(data);
      }
    }
  });
});

module.exports = router;
