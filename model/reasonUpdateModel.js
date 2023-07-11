const crypto = require("crypto");
const connection = require("../db/database");

const ReasonUpdate = function (reasonUpdate) {};

ReasonUpdate.getAll = (req, res) => {
  var idCommand = req.body.idCommand;
  var reasonName = req.body.reasonName;
  var reasonDay = req.body.reasonDay;
  var createUid = req.body.createUid;
  var createDate = req.body.createDate;

  const query =
    "UPDATE bz_timestamp.t_reason SET " +
    "reason_name='" +
    reasonName +
    "',reason_day='" +
    reasonDay +
    "'," +
    "update_uid='" +
    createUid +
    "',update_date='" +
    createDate +
    "'" +
    " WHERE reason_id='" +
    idCommand +
    "'";

  //console.log(query);
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Update reason success");
      res(null, { msg: "Update reason success" });
    }
  });
};

module.exports = ReasonUpdate;
