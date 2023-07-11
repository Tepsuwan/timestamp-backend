const crypto = require("crypto");
const connection = require("../db/database");
const moment = require("moment");
const reasonName = require("../routes/reasonName");

const ReasonInsert = function (reasonInsert) {};

ReasonInsert.getAll = (req, res) => {
  var reasonId = crypto.randomBytes(6).toString("hex");
  var reasonName = req.body.reasonName;
  var reasonDay = req.body.reasonDay;
  var createUid = req.body.createUid;
  var createDate = req.body.createDate;

  const query =
    "INSERT INTO bz_timestamp.t_reason(" +
    "reason_id, reason_name, reason_day," +
    " create_uid, create_date" +
    ") VALUES (" +
    "'" +
    reasonId +
    "','" +
    reasonName +
    "','" +
    reasonDay +
    "','" +
    createUid +
    "','" +
    createDate +
    "'" +
    ")";
  //console.log(query);

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Insert reason success");
      res(null, { msg: "Insert reason success" });
    }
  });
};

module.exports = ReasonInsert;
