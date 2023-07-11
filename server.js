const express = require("express");
const app = express();
const cors = require("cors");
const loadstampRouter = require("./routes/load.js");
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

require("./routes/userData.js")(app);
require("./routes/loadStamps.js")(app);
require("./routes/loadHolidays.js")(app);
require("./routes/loadOnline.js")(app);
require("./routes/Start.js")(app);
require("./routes/stop.js")(app);
require("./routes/note.js")(app);
require("./routes/reasonName.js")(app);
require("./routes/calendarUser.js")(app);
require("./routes/getWorkShift.js")(app);
require("./routes/loadWorkShift.js")(app);
require("./routes/loadCalendar.js")(app);
require("./routes/calendarInsert.js")(app);
require("./routes/callendarDelete.js")(app);
require("./routes/workTimeAll.js")(app);
require("./routes/updateWorkTime.js")(app);
require("./routes/holidaysReport.js")(app);
require("./routes/staff.js")(app);
require("./routes/team.js")(app);
require("./routes/office.js")(app);
require("./routes/report.js")(app);
require("./routes/loadSummary.js")(app);
require("./routes/employee.js")(app);
require("./routes/reasonSetting.js")(app);
require("./routes/workShiftSetting.js")(app);
require("./routes/user.js")(app);
require("./routes/role.js")(app);
require("./routes/roleLoad.js")(app);
require("./routes/binLoad.js")(app);
require("./routes/extraInsert.js")(app);
require("./routes/extraUpdate.js")(app);
require("./routes/extraDelete.js")(app);
require("./routes/exetraLoad.js")(app);
require("./routes/reasonInsert.js")(app);
require("./routes/reasonUpdate.js")(app);
require("./routes/reasonDelete.js")(app);
require("./routes/wsInsert.js")(app);
require("./routes/wsUpdate.js")(app);
require("./routes/wsDelete.js")(app);
require("./routes/userInsert.js")(app);
require("./routes/userUpdate.js")(app);
require("./routes/userDelete.js")(app);
require("./routes/ws.js")(app);
require("./routes/roleInsert.js")(app);
require("./routes/roleUpdate.js")(app);
require("./routes/roleDelete.js")(app);
require("./routes/login.js")(app);
