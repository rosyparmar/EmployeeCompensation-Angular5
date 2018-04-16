/**
 * Created by Rosy Parmar on 4/13/18.
 */

module.exports = function () {
  var mongoose = require("mongoose");

  var UserSchema = mongoose.Schema ({
    username : String,
    password : String,
    google:{
      id: String,
      token: String
    },
    dateCreated : {type: Date, default : Date.now} //Date.now is the current time
  }, {collection: "employeeDatabase.authenticatedUser" });

  return UserSchema;
};
