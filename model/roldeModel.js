const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const connection = require("../db/database");

const Role = function (role) {};

Role.getAll = (req, res) => {
  const query =
    "SELECT `role_id`, `role_name`, `role_key`" +
    " FROM bz_timestamp.t_role" +
    //" LEFT JOIN bz_timestamp.t_role c ON c.role_key=a.role_key" +
    " WHERE 1";

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      console.log(query);
      res(null, result);
    }
  });
};

module.exports = Role;
