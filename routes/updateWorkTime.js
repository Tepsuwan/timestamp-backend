module.exports = (app) => {
  const updateWorkTime = require("../controllers/updateWorkTimeController");
  const auth = require("../middleware/auth");
  var router = require("express").Router();

  router.post("/", auth, updateWorkTime.create);

  app.use("/updateWorkTime", router);
};
