const WorkShiftSetting = require("../model/workShiftSettingModel");

exports.create = (req, res) => {
  WorkShiftSetting.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
