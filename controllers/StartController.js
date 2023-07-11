const Start = require("../model/StartModel");

exports.create = (req, res) => {
  Start.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.send(data);
  });
};
