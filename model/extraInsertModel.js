const crypto = require("crypto");
const connection = require("../db/database");
const moment = require("moment");

const ExtraInsert = function (extraInsert) {};

ExtraInsert.getAll = (req, res) => {
  var id = crypto.randomBytes(6).toString("hex");
  var date = req.body.date;
  var uid = req.body.uid;
  var workshift = req.body.workshift;
  var status = req.body.status;
  var updateDate = req.body.updateDate;
  var day = req.body.day;

  // d = moment(date);
  // day = d.format(`dddd`);
  // console.log(uid);
  // console.log(workshift);
  // console.log(day);
  const query =
    "SELECT id FROM bz_timestamp.t_extra_dayshift WHERE (date='" +
    date +
    "') and uid='" +
    uid +
    "' and status=0";

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.length > 0) {
        const query2 =
          "INSERT INTO bz_timestamp.t_extra_dayshift (status, id, work_shift_id, days,date, uid, create_uid, create_date) VALUES ('" +
          status +
          "', '" +
          id +
          "', '" +
          workshift +
          "', '" +
          day +
          "','" +
          date +
          "', '" +
          uid +
          "', '" +
          uid +
          "', '" +
          date +
          "')";

        console.log(query2);
        connection.query(query2, (err2, result2) => {
          if (err2) {
            console.log(err2);
          } else {
            console.log("Insert success");
          }
        });
      } else {
        var id = crypto.randomBytes(6).toString("hex");
        const query3 =
          "SELECT id FROM bz_timestamp.t_extra_dayshift WHERE (days='" +
          day +
          "') and uid='" +
          uid +
          "' and status=0";

        connection.query(query3, (err3, result3) => {
          if (err3) {
            console.log(err3);
          } else {
            if (result3.length >= 0) {
              const query4 =
                "INSERT INTO bz_timestamp.t_extra_dayshift (id, work_shift_id, days, uid, create_uid, create_date) VALUES ('" +
                id +
                "', '" +
                workshift +
                "', '" +
                day +
                "', '" +
                uid +
                "', '" +
                uid +
                "', '" +
                updateDate +
                "')";
              console.log(query4);
              connection.query(query4, (err4, result4) => {
                if (err4) {
                  console.log(err4);
                } else {
                  console.log("Insert query4 success");
                }
              });
            } else {
              res(null, { success: false });
            }
          }
        });
      }
    }
  });
};

module.exports = ExtraInsert;
