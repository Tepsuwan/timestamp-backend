module.exports = (app) => {
  const workShiftSetting = require("../controllers/workShiftSettingController");

  var router = require("express").Router();

  router.post("/", workShiftSetting.create);

  app.use("/workShiftSetting", router);
};
