const loadHolidays = require("../controllers/loadHolidaysController");
const auth = require("../middleware/auth");
module.exports = (app) => {
  var router = require("express").Router();
  router.get("/", auth, loadHolidays.findAll);
  app.use("/loadHolidays", router);
};
