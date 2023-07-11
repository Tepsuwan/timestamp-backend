module.exports = (app) => {
  const reasoninsert = require("../controllers/reasonInsertController");
  const auth = require("../middleware/auth");
  var router = require("express").Router();

  router.post("/", auth, reasoninsert.create);

  app.use("/reasoninsert", router);
};
