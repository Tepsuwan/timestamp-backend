const crypto = require("crypto");
const connection = require("../db/database");

const CalendarDelete = function (calendarDelete) {};

CalendarDelete.getAll = (req, res) => {
  idCommand = req.body.idCommand;
  console.log(idCommand);
  calendarId = "";
  calendarMateId = "";
  const query =
    "SELECT calendar_id, calendar_mate_id, work_shift_id" +
    " FROM bz_timestamp.t_calendar WHERE calendar_id='" +
    idCommand +
    "'";
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      calendarId = result[0].calendar_id;
      calendarMateId = result[0].calendar_mate_id;

      if (calendarMateId != "" || calendarMateId != null) {
        const sql =
          "DELETE FROM bz_timestamp.t_calendar" +
          " WHERE calendar_id='" +
          calendarMateId +
          "'";
        connection.query(sql, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Delete calendarMateId success");
          }
        });
      } else {
        const sql =
          "DELETE FROM bz_timestamp.t_calendar" +
          " WHERE calendar_mate_id='" +
          idCommand +
          "'";
        console.log(sql);
        connection.query(sql, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Delete calendarId success");
          }
        });
      }

      const sql =
        "DELETE FROM bz_timestamp.t_calendar" +
        " WHERE calendar_id='" +
        idCommand +
        "'";
      connection.query(sql, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Delete calendarId success");
          res(null, { success: true });
        }
      });
    }
  });
};

module.exports = CalendarDelete;
