const connection = require("../db/database");
const crypto = require("crypto");
const role = require("../routes/role");

const RoleInsert = function (roleInsert) {};

RoleInsert.getAll = (req, res) => {
  var roleId = crypto.randomBytes(6).toString("hex");
  var roleName = req.body.roleName;
  var roleDescription = req.body.roleDescription;
  var roleKey = req.body.roleKey;
  var createUid = req.body.createUid;
  var createDate = req.body.createDate;
  //console.log(req.body);
  const query =
    "INSERT INTO bz_timestamp.t_role(" +
    "role_id, role_name, role_discription,role_key," +
    " create_uid, create_date" +
    ") VALUES (" +
    "'" +
    roleId +
    "','" +
    roleName +
    "','" +
    roleDescription +
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
      console.log("Insert role success.");
      res(null, { msg: "Insert role success." });
    }
  });
};

module.exports = RoleInsert;
