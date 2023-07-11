const UpdateWorkTime = require("../model/updateWorkTimeModel");

exports.create = (req, res) => {
  UpdateWorkTime.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
