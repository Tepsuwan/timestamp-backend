module.exports = (app) => {
  const reasonUpdate = require("../controllers/reasonUpdateController");
  const auth = require("../middleware/auth");

  var router = require("express").Router();

  router.post("/", auth, reasonUpdate.create);

  app.use("/reasonUpdate", router);
};
