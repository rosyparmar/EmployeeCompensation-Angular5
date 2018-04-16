/**
 * Created by Rosy Parmar on 4/13/18.
 */
module.exports = function (app) {

  var models = require("./model/models.server")();
  require("./services/employee.service.server.js")(app, models);
  require("./services/user/user.service.server.js")(app, models);

};

