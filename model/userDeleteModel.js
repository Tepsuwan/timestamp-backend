const connection = require("../db/database");

const UserDelete = function (userDelete) {};

UserDelete.getAll = (req, res) => {
  var idCommand = req.body.idCommand;

  const query =
    "DELETE FROM bz_timestamp.t_admin_user" +
    " WHERE admin_user_id='" +
    idCommand +
    "'";
  console.log(query);
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Delete user success.");
      res(null, { msg: "Delete user success." });
    }
  });
};

module.exports = UserDelete;
