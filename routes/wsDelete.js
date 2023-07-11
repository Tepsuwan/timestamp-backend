module.exports = (app) => {
  const wsDelete = require("../controllers/wsDeleteController");
  const auth = require("../middleware/auth");

  var router = require("express").Router();

  router.post("/", auth, wsDelete.create);

  app.use("/wsDelete", router);
};
