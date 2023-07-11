module.exports = (app) => {
  const auth = require("../middleware/auth");
  const team = require("../controllers/teamController");

  var router = require("express").Router();

  router.get("/", auth, team.findAll);

  app.use("/team", router);
};
