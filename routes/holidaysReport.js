module.exports = (app) => {
  const holidaysReport = require("../controllers/holidaysReportController");

  var router = require("express").Router();

  router.get("/", holidaysReport.findAll);

  app.use("/holidaysReport", router);
};
