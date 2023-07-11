const WorkTimeAll = require("../model/workTimeAllModel");

exports.findAll = (req, res) => {
  WorkTimeAll.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
