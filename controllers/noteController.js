const Note = require("../model/noteModel");

exports.create = (req, res) => {
  Note.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.send(data);
  });
};
