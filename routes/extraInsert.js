module.exports = (app) => {
  const extraInsert = require("../controllers/extraInsertController");
  const auth = require("../middleware/auth");
  var router = require("express").Router();

  router.post("/", auth, extraInsert.create);

  app.use("/extraInsert", router);
};
