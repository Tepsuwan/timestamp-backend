const connection = require("../db/database");

const WsDelete = function (wsDelete) {};

WsDelete.getAll = (req, res) => {
  var idCommand = req.body.idComand2;

  const query =
    "DELETE FROM bz_timestamp.t_work_shift" +
    " WHERE work_shift_id='" +
    idCommand +
    "'";

  // console.log(query);
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Delete workshift success.");
      res(null, { msg: "Delete workshift success." });
    }
  });
};

module.exports = WsDelete;
