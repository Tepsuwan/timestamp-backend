const loadOnline = require("../controllers/loadOnlineController");
const auth = require("../middleware/auth");
module.exports = (app) => {
  var router = require("express").Router();

  router.get("/", auth, loadOnline.findAll);

  app.use("/loadOnline", router);
};
