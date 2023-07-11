const connection = require("../db/database");
const crypto = require("crypto");

const UserInsert = function (userInsert) {};

UserInsert.getAll = (req, res) => {
  var adminUser = crypto.randomBytes(6).toString("hex");
  var uid = req.body.uid;
  var roleKey = req.body.roleKey;
  var createUid = req.body.createUid;
  var createDate = req.body.createDate;

  const query =
    "INSERT INTO bz_timestamp.t_admin_user(" +
    "admin_user_id, uid,role_key," +
    " create_uid, create_date" +
    ") VALUES (" +
    "'" +
    adminUser +
    "','" +
    uid +
    "'," +
    roleKey +
    ",'" +
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
      console.log("Insert user success.");
      res(null, { msg: "Insert user success." });
    }
  });
};

module.exports = UserInsert;
