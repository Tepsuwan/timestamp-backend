module.exports = (app) => {
  const userInsert = require("../controllers/userInsertController");
  const auth = require("../middleware/auth");

  var router = require("express").Router();

  router.post("/", auth, userInsert.create);

  app.use("/userInsert", router);
};
