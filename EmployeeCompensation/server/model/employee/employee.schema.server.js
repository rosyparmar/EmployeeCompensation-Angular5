/**
 * Created by Rosy Parmar on 4/13/18.
 */

module.exports = function () {
  var mongoose = require("mongoose");

  var UserSchema = mongoose.Schema ({
    firstName : String,
    lastName : String,
    dateOfJoining : Date,
    baseSalary : Number,
    deduction401 : Number,
    deductionMedical : Number,
    stateTax : Number,
    inHandPay : Number,
    dateCreated : {type: Date, default : Date.now} //Date.now is the current time
  }, {collection: "employeeDatabase.employeePayroll" });

  return UserSchema;
};
