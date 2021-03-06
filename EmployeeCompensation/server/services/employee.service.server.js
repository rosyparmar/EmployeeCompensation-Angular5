/**
 * Created by Rosy Parmar on 4/13/18.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app, models) {

  var employeeModel = models.employeeModel;

  app.post("/api/createEmployee", createEmployee);
  app.get("/api/employees", getEmployees);
  app.get("/api/employee/:employeeId", findEmployeeById);
  app.delete("/api/employee/:employeeId", deleteEmployee);
  app.put("/api/employee/:employeeId", updateEmployee);



  function createEmployee(req, res) {

    var employee = req.body;
    var empUsername = employee.username;
    employeeModel
      .findEmployeeByUsername(employee.username)
      .then(function (data) {
        if (data) {
          res.status(400).send('Username is in use!');
          return;
        } else {
          employeeModel
            .createEmployee(employee)
            .then(
              function (employee) {
                res.json(employee);
              },
              function (error) {
                res.statusCode(400).send(error);
              }
            )
        }
      });
  }

  function deleteEmployee(req, res) {
    var employeeId = req.params.employeeId;
    employeeModel
      .deleteEmployee(employeeId)
      .then(function (stats) {
          res.send(200);
        },
        function (error) {
          res.statusCode(404).send(error);
        });
  }

  function findEmployeeByUsername(empname, res) {
    employeeModel
      .findEmployeeByUsername(empname)
      .then(function (emp) {
          res.json(emp);
        },
        function (err) {
          res.statusCode(404).send(err);
        });
  }

  function updateEmployee(req, res) {

    var employeeId = req.params.employeeId;
    var employee = req.body;
    employeeModel
      .updateEmployee(employeeId, employee)
      .then(function (employee) {
          res.json(employee);
        },
        function (error) {
          res.statusCode(404).send(error);
        });
  }

  function findEmployeeById(req, res) {
    var id = req.params.employeeId;
    employeeModel
      .findEmployeeById(id)
      .then(function (employee) {
          res.json(employee);
        },
        function (error) {
          res.statusCode(404).send(error);
        });
  }

  function getEmployees(req, res) {
    employeeModel
      .getEmployees()
      .then(function (employees) {
          console.log("Lets Rock");
          console.log(employees);
          res.json(employees);
        },
        function (error) {
          res.statusCode(404).send(error);
        });
  }

};
