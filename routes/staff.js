module.exports = (app) => {
  const staff = require("../controllers/staffController");
  const auth = require("../middleware/auth");

  var router = require("express").Router();

  router.get("/", staff.findAll);

  app.use("/staff", router);
};
