const connection = require("../db/database");

const UserUpdate = function (userUpdate) {};

UserUpdate.getAll = (req, res) => {
  var uid = req.body.uid;
  var roleKey = req.body.roleKey;
  var createUid = req.body.createDate;
  var createDate = req.body.createDate;
  var idCommand = req.body.idCommand;
  const query =
    "UPDATE bz_timestamp.t_admin_user SET " +
    "uid='" +
    uid +
    "',role_key=" +
    roleKey +
    "," +
    "update_uid='" +
    createUid +
    "',update_date='" +
    createDate +
    "'" +
    " WHERE admin_user_id='" +
    idCommand +
    "'";
  //console.log(query);
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Update user success.");
      res(null, { msg: "Update user success." });
    }
  });
};

module.exports = UserUpdate;
