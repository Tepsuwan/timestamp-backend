const calendarUser = require("../controllers/calendarUserController");
const auth = require("../middleware/auth");
module.exports = (app) => {
  var router = require("express").Router();

  router.get("/", auth, calendarUser.findAll);

  app.use("/calendarUser", router);
};
