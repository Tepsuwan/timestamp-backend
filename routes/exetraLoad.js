module.exports = (app) => {
  const extraLoad = require("../controllers/extraLoadController");
  const auth = require("../middleware/auth");

  var router = require("express").Router();

  router.get("/", auth, extraLoad.findAll);

  app.use("/extraLoad", router);
};
