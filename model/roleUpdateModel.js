const connection = require("../db/database");

const RoleUpdate = function (roleUpdate) {};

RoleUpdate.getAll = (req, res) => {
  var idCommand = req.body.idCommand;
  var roleName = req.body.roleName;
  var roleDescription = req.body.roleDescription;
  var roleKey = req.body.roleKey;
  var createUid = req.body.createUid;
  var createDate = req.body.createDate;

  //console.log(req.body);
  const query =
    "UPDATE bz_timestamp.t_role SET " +
    "role_name='" +
    roleName +
    "',role_discription='" +
    roleDescription +
    "',role_key=" +
    roleKey +
    "," +
    "update_uid='" +
    createUid +
    "',update_date='" +
    createDate +
    "'" +
    " WHERE role_id='" +
    idCommand +
    "'";
  //console.log(query);
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Update role success.");
      res(null, { msg: "Update role success." });
    }
  });
};

module.exports = RoleUpdate;
