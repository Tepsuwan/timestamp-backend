module.exports = (app) => {
  const role = require("../controllers/roleController");
  const auth = require("../middleware/auth");

  var router = require("express").Router();

  router.get("/", auth, role.findAll);

  app.use("/role", router);
};
