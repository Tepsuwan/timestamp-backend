const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const connection = require("../db/database");

const Role = function (role) {};

Role.getAll = (req, res) => {
  const query =
    "SELECT @rownum := @rownum + 1 AS rownum," +
    "role_id as id,role_name,role_discription,role_key" +
    " FROM bz_timestamp.t_role" +
    " ,(SELECT @rownum := 0) r" +
    " WHERE 1" +
    " ORDER BY role_key ASC";
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //console.log(result);
      res(null, result);
    }
  });
};

module.exports = Role;
