const loadWorkShift = require("../controllers/loadWorkShiftController");
const auth = require("../middleware/auth");
module.exports = (app) => {
  var router = require("express").Router();

  router.get("/", auth, loadWorkShift.findAll);

  app.use("/loadWorkShift", router);
};
