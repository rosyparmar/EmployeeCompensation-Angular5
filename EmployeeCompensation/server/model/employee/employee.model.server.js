/**
 * Created by Rosy Parmar on 4/13/18.
 */

module.exports = function () {

  var mongoose = require ("mongoose");
  var EmployeeSchema = require("./employee.schema.server")();
  var Employee =  mongoose.model("Employee", EmployeeSchema);

  var api = {
    createEmployee: createEmployee,
    findEmployeeById: findEmployeeById,
    deleteEmployee: deleteEmployee,
    updateEmployee: updateEmployee,
    getEmployees :getEmployees,
    findEmployeeByUsername : findEmployeeByUsername
  };

  return api;

  function findEmployeeById(empId) {
    return Employee.findById({_id: empId});
  }

  function getEmployees() {
    return Employee.find();
  }

  function updateEmployee(empId, emp) {
    delete emp._id;
    return Employee
      .update({_id: empId},{
        $set: {
          firstName : emp.firstName,
          lastName : emp.lastName,
          dateOfJoining : emp.dateOfJoining,
          baseSalary :emp.baseSalary,
          deduction401 : emp.deduction401,
          deductionMedical : emp.deductionMedical,
          stateTax : emp.stateTax,
          inHandPay : emp.inHandPay}}
      );
  }

  function deleteEmployee(empId) {
    return Employee.remove({_id: empId});
  }


  function createEmployee(emp){
    return  Employee.create(emp);
  }

  function findEmployeeByUsername(username) {
    return Employee.findOne({username: username});
  }

};
