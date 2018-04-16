/**
 * Created by Rosy Parmar on 4/13/18.
 */


module.exports  = function () {

  var models = {
    employeeModel: require("./employee/employee.model.server")(),
    userModel : require("./user/user.model.server")()
  };

  return models;
};
