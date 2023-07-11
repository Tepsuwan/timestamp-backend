const Employee = require("../model/employeeModel");

exports.findAll = (req, res) => {
  Employee.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Eror!!!!.",
      });
    else res.json(data);
  });
};
