const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const connection = require("../db/database");

const User = function (user) {};

User.getAll = (req, res) => {
  const query =
    "SELECT @rownum := @rownum + 1 AS rownum," +
    "a. admin_user_id as id,CONCAT(b.titlename,' ',b.Name,' ( ',b.NickName,' )') as name,c.role_name" +
    " FROM bz_timestamp.t_admin_user a " +
    " LEFT JOIN baezenic_people.t_people b ON b.id=a.uid" +
    " LEFT JOIN bz_timestamp.t_role c ON c.role_key=a.role_key" +
    " ,(SELECT @rownum := 0) r" +
    " WHERE b.status<>'Y' AND b.Office!='Vietnam'" +
    " ORDER BY b.id ASC";

  connection.query(query, (err, ressult) => {
    if (err) {
      console.log(query);
    } else {
      //console.log(ressult);
      res(null, ressult);
    }
  });
};

module.exports = User;
