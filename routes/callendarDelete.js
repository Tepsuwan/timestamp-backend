const calendarDelete = require("../controllers/calendarDeleteController");
const auth = require("../middleware/auth");
module.exports = (app) => {
  var router = require("express").Router();

  router.post("/", auth, calendarDelete.create);

  app.use("/calendarDelete", router);
};
