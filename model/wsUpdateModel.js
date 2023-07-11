const connection = require("../db/database");
const crypto = require("crypto");

const WsUpdate = function (wsUpdate) {};

WsUpdate.getAll = (req, res) => {
  var idCommand = req.body.idCommand;
  var start = req.body.start;
  var stop = req.body.stop;
  var createUid = req.body.createDate;
  var createDate = req.body.createDate;

  const query =
    "UPDATE bz_timestamp.t_work_shift SET " +
    "work_shift_start='" +
    start +
    "',work_shift_stop='" +
    stop +
    "'," +
    "update_uid='" +
    createUid +
    "',update_date='" +
    createDate +
    "'" +
    " WHERE work_shift_id='" +
    idCommand +
    "'";
  console.log(req.body);
  console.log(req.body.idComand);
  console.log(query);
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Update workshift success.");
      res(null, { msg: "Update workshift success." });
    }
  });
};

module.exports = WsUpdate;
