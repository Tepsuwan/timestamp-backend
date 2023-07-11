module.exports = (app) => {
  const UserUpdate = require("../controllers/userUpdateController");
  const auth = require("../middleware/auth");

  var router = require("express").Router();

  router.post("/", auth, UserUpdate.create);

  app.use("/UserUpdate", router);
};
