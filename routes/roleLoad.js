module.exports = (app) => {
  const roleLoad = require("../controllers/roleLoadController");
  const auth = require("../middleware/auth");

  var router = require("express").Router();

  router.get("/", auth, roleLoad.findAll);

  app.use("/roleLoad", router);
};
