module.exports = (app) => {
  const reasonDelete = require("../controllers/reasonDeleteController");
  const auth = require("../middleware/auth");

  var router = require("express").Router();

  router.post("/", auth, reasonDelete.create);

  app.use("/reasonDelete", router);
};
