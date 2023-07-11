const connection = require("../db/database");

const ExtraUpdate = function (extraUpdate) {};
ExtraUpdate.getAll = (req, res) => {
  var idCommand = req.body.idCommand;

  //console.log(req.body);
  const query =
    "UPDATE bz_timestamp.t_extra_dayshift SET " +
    "status=1" +
    " WHERE id='" +
    idCommand +
    "'";

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Delete extra dayshift success");
      res(null, { success: true });
    }
  });
};

module.exports = ExtraUpdate;
