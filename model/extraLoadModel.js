const connection = require("../db/database");
const ExtraLoad = function (extraLoad) {};

ExtraLoad.getAll = (req, res) => {
  var uid = req.query.uid;
  //console.log(uid);
  const query =
    "SELECT a.id,a.days,if(a.date='0000-00-00','',a.date) as date,concat(b.work_shift_start,\"-\",b.work_shift_stop) as work_shift " +
    "FROM bz_timestamp.t_extra_dayshift a " +
    "INNER JOIN bz_timestamp.t_work_shift b ON a.work_shift_id=b.work_shift_id " +
    "WHERE a.uid='" +
    uid +
    "' and a.status=0";

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Extra load success");
      res(null, result);
    }
  });
};

module.exports = ExtraLoad;
