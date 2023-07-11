module.exports = (app) => {
  const login = require("../controllers/loginController");

  var router = require("express").Router();

  router.post("/", login.create);

  app.use("/login", router);
};
