const Login = require("../model/loginModel");
const jwt = require("jsonwebtoken");

exports.create = (req, res) => {
  Login.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else {
      if (data.length > 0) {
        res.status(200).json({
          msg: "Login success",
          data: data,
        });
      } else {
        res.status(400).json({
          msg: "Login false",
        });
      }
    }
  });
};
