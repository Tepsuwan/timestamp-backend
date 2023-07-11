const connection = require("../db/database");
const moment = require("moment");

const ExtraUpdate = function (extraUpdate) {};

ExtraUpdate.getAll = (req, res) => {
  var date = req.body.date;
  var uid = req.body.uid;
  var workshift = req.body.workshift;
  var updateDate = req.body.updateDate;
  var day = req.body.day;
  //console.log(day);

  var idCommand = req.body.idCommand;

  const query =
    "UPDATE bz_timestamp.t_extra_dayshift SET " +
    "uid='" +
    uid +
    "',work_shift_id='" +
    workshift +
    "'," +
    "days='" +
    day +
    "',date='" +
    date +
    "'," +
    "update_uid='" +
    uid +
    "',update_date='" +
    updateDate +
    "'" +
    " WHERE id='" +
    idCommand +
    "'";

  // console.log(query);
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Update extra dayshift success");
      res(null, { successl: true });
    }
  });
};

module.exports = ExtraUpdate;
