const LoadStamps = require("../model/loadStampsModel");

exports.findAll = (req, res) => {
  LoadStamps.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else {
      console.log("Load stamp success: ");
      res.send(data);
    }
  });
};
