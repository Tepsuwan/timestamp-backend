const connection = require("../db/database");
const crypto = require("crypto");

const WsInsert = function (wsInsert) {};

WsInsert.getAll = (req, res) => {
  var wsId = crypto.randomBytes(6).toString("hex");
  var start = req.body.start;
  var stop = req.body.stop;
  var createUid = req.body.createDate;
  var createDate = req.body.createDate;

  const query =
    "INSERT INTO bz_timestamp.t_work_shift(" +
    "work_shift_id, work_shift_start, work_shift_stop," +
    " create_uid, create_date" +
    ") VALUES (" +
    "'" +
    wsId +
    "','" +
    start +
    "','" +
    stop +
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
      console.log("Insert workshift success.");
      res(null, { msg: "Insert workshift success." });
    }
  });
};

module.exports = WsInsert;
