const loadCalendar = require("../controllers/loadCalendarController");
const auth = require("../middleware/auth");
module.exports = (app) => {
  var router = require("express").Router();

  router.get("/", auth, loadCalendar.findAll);

  app.use("/loadCalendar", router);
};
