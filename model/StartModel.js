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

Start.getAll = (req, res) => {
  //   console.log(req.query.uid);
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
  var uid = req.body.uid;

  console.log(uid);
  console.log(action);

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
  //console.log(ipAddresses);

  var day = weekday[currentDate.getDay()];
  //var dateNow = year + "-" + month + "-" + date;

  var Current = moment();
  var dateNow = Current.format(`YYYY-MM-DD`);
  var CD = Current.format(`YYYY-MM-DD HH:mm:ss`);
  var d = req.body.d;
  var stamp_id = crypto.randomBytes(6).toString("hex");
  //console.log(dateNow);
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
        if (err2) {
          console.log(err2);
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

            connection.query(sql, function (err3, result3) {
              if (err3) {
                console.log(err3);
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
            //console.log(query);
            var num_rows = result.length;
            //console.log(num_rows);

            if (num_rows > 0) {
              const query = `SELECT stamp_start FROM bz_timestamp.t_stamp WHERE stamp_date= '${d}'`;

              connection.query(query, function (err, result) {
                if (err) {
                  console.log(err);
                } else {
                  //console.log(result);
                  if (result[0].stamp_start === "0000-00-00 00:00:00") {
                    const query = `SELECT stamp_id FROM bz_timestamp.t_stamp WHERE stamp_date= '${d}'`;
                    connection.query(query, function (err, result) {
                      if (err) {
                        console.log(err);
                      } else {
                        //console.log(result[0].stamp_id);
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
                              obj = {
                                action: action,
                                uid: uid,
                                stamp_id: stamp_id,
                                wsid: wsid,
                                dateNow: dateNow,
                                day: day,
                              };
                              //id_command = result[0].stamp_id;
                              //update_late(action);
                              console.log("Update start success");
                              res(null, result);
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
                    res(null, "Duplicate start");
                    //res.json((msg = "Duplicate start"));
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
                    //console.log(req.query.uid);
                    console.log(obj);
                    res(null, obj);
                  } else {
                    console.log(obj);
                  }
                }
              });
            }
          }
        });
      });
    }
  });
};

module.exports = Start;
