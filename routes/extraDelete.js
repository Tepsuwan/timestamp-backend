module.exports = (app) => {
  const extraDelete = require("../controllers/extraDeleteController");
  const auth = require("../middleware/auth");
  var router = require("express").Router();

  router.post("/", auth, extraDelete.create);

  app.use("/extraDelete", router);
};
