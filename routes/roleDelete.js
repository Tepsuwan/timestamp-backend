module.exports = (app) => {
  const roleDelete = require("../controllers/roleDeleteController");
  const auth = require("../middleware/auth");

  var router = require("express").Router();

  router.post("/", auth, roleDelete.create);

  app.use("/roleDelete", router);
};
