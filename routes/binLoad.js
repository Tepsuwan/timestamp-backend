module.exports = (app) => {
  const binload = require("../controllers/binLoadController");

  var router = require("express").Router();

  router.get("/", binload.findAll);

  app.use("/binload", router);
};
