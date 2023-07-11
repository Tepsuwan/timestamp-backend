module.exports = (app) => {
  const wsUpdate = require("../controllers/wsUpdateController");
  const auth = require("../middleware/auth");
  var router = require("express").Router();

  router.post("/", auth, wsUpdate.create);

  app.use("/wsUpdate", router);
};
