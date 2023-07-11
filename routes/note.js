const note = require("../controllers/noteController");
const auth = require("../middleware/auth");
module.exports = (app) => {
  var router = require("express").Router();

  router.post("/", auth, note.create);

  app.use("/note", router);
};
