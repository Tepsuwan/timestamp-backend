const Stop = require("../model/stopModel");

exports.create = (req, res) => {
  Stop.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.send(data);
  });
};
