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

const NoteModel = function (noteModel) {};

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

NoteModel.getAll = (req, res) => {
  let Current = moment();
  let CurrentDate = Current.format(`YYYY-MM-DD HH:mm:ss`);
  var d = req.body.d;
  var uid = req.body.uid;
  var stamp_date = req.body.stamp_date;
  var ddd = moment(stamp_date, "DD-MM-YYYY");
  var stampD = ddd.format(`YYYY-MM-DD`);
  //console.log(ddd);
  var stamp_id = req.body.stamp_id;
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
    } else {
      console.log(results);
      const query = `SELECT stamp_id FROM bz_timestamp.t_stamp WHERE stamp_date= '${stampD}'`;
      connection.query(query, function (err, results) {
        if (err) {
          console.log(err);
        } else {
          console.log(results);
          var numRows = results.length;
          console.log(numRows);
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
              } else {
                console.log("Update note success.");
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
                } else {
                  console.log("Insert note sucscess");
                }
              });
            } else {
              const query = `INSERT INTO bz_timestamp.t_stamp(stamp_id, stamp_uid , stamp_date, reason_id) 
            VALUES ('${stamp_id}','${stamp_uid}','${stampD}','${reason}')`;
              connection.query(query, function (err, results) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Insert reason success");
                }
              });
            }
          }
        }
      });
    }
  });
};

module.exports = NoteModel;
