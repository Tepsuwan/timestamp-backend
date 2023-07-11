module.exports = (app) => {
  const wsInsert = require("../controllers/wsInsertController");
  const auth = require("../middleware/auth");
  var router = require("express").Router();

  router.post("/", auth, wsInsert.create);

  app.use("/wsInsert", router);
};
