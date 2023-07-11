module.exports = (app) => {
  const extraUpdate = require("../controllers/extraUpdateController");
  const auth = require("../middleware/auth");
  var router = require("express").Router();

  router.post("/", auth, extraUpdate.create);

  app.use("/extraUpdate", router);
};
