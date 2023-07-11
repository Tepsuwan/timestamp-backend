const userData = require("../controllers/userDataController");
const auth = require("../middleware/auth");
module.exports = (app) => {
  var router = require("express").Router();
  router.get("/", auth, userData.findAll);
  app.use("/userDatas", router);
};
