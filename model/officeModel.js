const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const connection = require("../db/database");

const Office = function (office) {};

Office.getAll = (req, res) => {
  var data = [];
  const query =
    "SELECT distinct Office" +
    " FROM baezenic_people.t_people" +
    " WHERE 1 AND status<>'Y' ";

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //console.log(result[0]);
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        //console.log(row.Office);
        var obj = {
          text: row.Office,
          value: row.Office,
        };
        data.push(obj);
      });
      console.log("Load office name success");
      res(null, data);
    }
  });
};

module.exports = Office;
