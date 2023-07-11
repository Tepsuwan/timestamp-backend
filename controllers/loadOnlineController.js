const LoadOnline = require("../model/loadOnlineModel");

exports.findAll = (req, res) => {
  LoadOnline.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Error load online",
      });
    else {
      res.send(data);
    }
  });
};
