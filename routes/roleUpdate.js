module.exports = (app) => {
  const roleUpdate = require("../controllers/roleUppdateController");
  const auth = require("../middleware/auth");

  var router = require("express").Router();

  router.post("/", auth, roleUpdate.create);

  app.use("/roleUpdate", router);
};
