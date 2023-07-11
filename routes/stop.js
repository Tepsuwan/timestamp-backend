const stop = require("../controllers/stopController");
const auth = require("../middleware/auth");
module.exports = (app) => {
  var router = require("express").Router();

  router.post("/", auth, stop.create);

  app.use("/stop", router);
};
