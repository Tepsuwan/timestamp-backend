const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const connection = require("../db/database");
const crypto = require("crypto");
const moment = require("moment");

const UpdateWorkTime = function (updateWorkTime) {};

UpdateWorkTime.getAll = (req, res) => {
  var id = req.body.id;
  var access = req.body.access;
  var workTime = req.body.workTime;

  if (access == true) {
    access = "1";
  } else if (access == false) {
    access = "0";
  }
  var Current = moment();
  var cd = Current.format(`YYYY-MM-DD HH:mm:ss`);

  if (access == 0 || access == 1) {
    const sql =
      "SELECT id FROM bz_timestamp.t_employee_time WHERE uid='" + id + "'";
    connection.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length == 0) {
          const idSetting = crypto.randomBytes(6).toString("hex");
          const sql =
            "INSERT INTO bz_timestamp.t_employee_time(" +
            "id,uid, is_operator," +
            " create_user, create_date" +
            ") VALUES (" +
            "'" +
            idSetting +
            "','" +
            id +
            "','" +
            access +
            "','" +
            id +
            "','" +
            cd +
            "'" +
            ")"; /*
          connection.query(sql, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Insert accesss success.");
              res(null, "Insert accesss success.");
            }
          });*/
        } else {
          let query =
            "UPDATE bz_timestamp.t_employee_time SET is_operator='" +
            access +
            "' ";
          query += " WHERE uid='" + id + "' ";

          connection.query(query, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Update accesss success.");
              res(null, "Update accesss success.");
            }
          });
        }
      }
    });
  } else {
    const sql =
      "SELECT id FROM bz_timestamp.t_employee_time WHERE uid='" + id + "'";
    connection.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length == 0) {
          const idSetting = crypto.randomBytes(6).toString("hex");
          const sql =
            "INSERT INTO bz_timestamp.t_employee_time(" +
            "id,uid, work_shift_id," +
            " create_user, create_date" +
            ") VALUES (" +
            "'" +
            idSetting +
            "','" +
            id +
            "','" +
            workTime +
            "','" +
            id +
            "','" +
            cd +
            "'" +
            ")";
          connection.query(sql, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Insert work time success.");
              res(null, "Insert work time success.");
            }
          });
        } else {
          let query =
            "UPDATE bz_timestamp.t_employee_time SET work_shift_id='" +
            workTime +
            "' ";
          query += " WHERE uid='" + id + "' ";

          //console.log(query);
          connection.query(query, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Update work time success.");
              res(null, "Update work time success.");
            }
          });
        }
      }
    });
  }

  /*
  const sql =
    "SELECT id FROM bz_timestamp.t_employee_time WHERE uid='" + id + "'";
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.length == 0) {
        console.log(result.length);
      } else {
        let query = "UPDATE t_employee_time SET $prop='$value' ";
      }
    }
  });
  */
};

module.exports = UpdateWorkTime;
