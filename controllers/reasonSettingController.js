const ReasonSetting = require("../model/reasonSettingModel");

exports.findAll = (req, res) => {
  ReasonSetting.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
