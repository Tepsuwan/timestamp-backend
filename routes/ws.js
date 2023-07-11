module.exports = (app) => {
  const ws = require("../controllers/wsController");
  const auth = require("../middleware/auth");
  var router = require("express").Router();

  router.get("/", auth, ws.findAll);

  app.use("/ws", router);
};
