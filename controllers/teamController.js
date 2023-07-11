const Team = require("../model/teamModel");

exports.findAll = (req, res) => {
  Team.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
