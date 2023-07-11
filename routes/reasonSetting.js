module.exports = (app) => {
  const reasonSetting = require("../controllers/reasonSettingController");
  const auth = require("../middleware/auth");
  var router = require("express").Router();

  router.get("/", auth, reasonSetting.findAll);

  app.use("/reasonSetting", router);
};
