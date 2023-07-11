const Staff = require("../model/staffModel");

exports.findAll = (req, res) => {
  Staff.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
