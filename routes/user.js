module.exports = (app) => {
  const user = require("../controllers/userController");
  const auth = require("../middleware/auth");
  var router = require("express").Router();

  router.get("/", auth, user.findAll);

  app.use("/user", router);
};
