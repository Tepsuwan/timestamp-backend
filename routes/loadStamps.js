const auth = require("../middleware/auth");
const LoadStamps = require("../controllers/loadStampController");
var router = require("express").Router();
module.exports = (app) => {
  router.get("/", auth, LoadStamps.findAll);
  app.use("/loadStamps", router);
};
