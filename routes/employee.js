module.exports = (app) => {
  const emplyee = require("../controllers/employeeController");
  const auth = require("../middleware/auth");
  var router = require("express").Router();

  router.get("/", auth, emplyee.findAll);

  app.use("/employee", router);
};
