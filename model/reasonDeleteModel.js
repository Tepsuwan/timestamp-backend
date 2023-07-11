const connection = require("../db/database");

const ReasonDelete = function (reasonDelete) {};

ReasonDelete.getAll = (req, res) => {
  var idCommad2 = req.body.idCommad2;
  console.log(idCommad2);
  const query =
    "DELETE FROM bz_timestamp.t_reason" +
    " WHERE reason_id='" +
    idCommad2 +
    "'";
  console.log(query);
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Delete reason success");
      res(null, { msg: "Delete reason success" });
    }
  });
};

module.exports = ReasonDelete;
