const ReasonUpdate = require("../model/reasonUpdateModel");

exports.create = (req, res) => {
  ReasonUpdate.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.send(data);
  });
};
