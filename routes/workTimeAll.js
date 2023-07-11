module.exports = (app) => {
  const workTimeAll = require("../controllers/workTimeAllController");
  const auth = require("../middleware/auth");
  var router = require("express").Router();

  router.get("/", auth, workTimeAll.findAll);

  app.use("/workTimeAll", router);
};
