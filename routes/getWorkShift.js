const getWorkShift = require("../controllers/getWorkShiftController");
const auth = require("../middleware/auth");
module.exports = (app) => {
  var router = require("express").Router();

  router.get("/", auth, getWorkShift.findAll);

  app.use("/getWorkShift", router);
};
