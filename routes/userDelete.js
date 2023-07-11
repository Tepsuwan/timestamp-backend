module.exports = (app) => {
  const userDelete = require("../controllers/userDeleteController");
  const auth = require("../middleware/auth");

  var router = require("express").Router();

  router.post("/", auth, userDelete.create);

  app.use("/userDelete", router);
};
