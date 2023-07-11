module.exports = (app) => {
  const roleInsert = require("../controllers/roleInserController");
  const auth = require("../middleware/auth");
  var router = require("express").Router();

  router.post("/", auth, roleInsert.create);

  app.use("/roleInsert", router);
};
