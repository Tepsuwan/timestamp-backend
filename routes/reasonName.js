const reasonName = require("../controllers/reasonName");
const auth = require("../middleware/auth");
module.exports = (app) => {
  var router = require("express").Router();

  router.get("/", auth, reasonName.findAll);

  app.use("/reasonName", router);
};
