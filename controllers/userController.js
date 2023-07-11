const User = require("../model/userModel");

exports.findAll = (req, res) => {
  User.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.send({ data: data });
  });
};
