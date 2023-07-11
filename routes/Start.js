const start = require("../controllers/StartController");
const auth = require("../middleware/auth");
module.exports = (app) => {
  var router = require("express").Router();

  router.post("/", auth, start.create);

  app.use("/start", router);
};
