const calendarInsert = require("../controllers/calendarInsertControler");
const auth = require("../middleware/auth");
module.exports = (app) => {
  var router = require("express").Router();

  router.post("/", auth, calendarInsert.create);

  app.use("/calendarInsert", router);
};
