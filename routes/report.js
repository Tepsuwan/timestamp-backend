module.exports = (app) => {
  const report = require("../controllers/reportController");

  var router = require("express").Router();

  router.get("/", report.findAll);

  app.use("/report", router);
};
