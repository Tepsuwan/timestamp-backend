const connection = require("../db/database");

const RoleDelete = function (roleDelete) {};

RoleDelete.getAll = (req, res) => {
  var idCommand = req.body.idCommand;

  //console.log(req.body.idCommand);
  const query =
    "DELETE FROM bz_timestamp.t_role" + " WHERE role_id='" + idCommand + "'";
  console.log(query);
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Delete role success.");
      res(null, { msg: "Delelte role success." });
    }
  });
};

module.exports = RoleDelete;
