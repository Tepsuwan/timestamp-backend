module.exports = (app) => {
  const loadSummary = require("../controllers/loadSummaryController");
  const auth = require("../middleware/auth");

  var router = require("express").Router();

  router.get("/", auth, loadSummary.findAll);

  app.use("/loadSummary", router);
};
