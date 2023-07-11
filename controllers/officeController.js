const Office = require("../model/officeModel");

exports.findAll = (req, res) => {
  Office.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
