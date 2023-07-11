module.exports = (app) => {
  const office = require("../controllers/officeController");
  const auth = require("../middleware/auth");

  var router = require("express").Router();

  router.get("/", auth, office.findAll);

  app.use("/office", router);
};
