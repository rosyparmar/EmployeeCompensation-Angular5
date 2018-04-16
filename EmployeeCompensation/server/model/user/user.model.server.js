/**
 * Created by Rosy Parmar on 4/13/18.
 */

module.exports = function () {

  var mongoose = require ("mongoose");
  var UserSchema = require("./user.schema.server")();
  var User =  mongoose.model("User", UserSchema);

  var api = {
    createUser: createUser,
    findUserByUsername: findUserByUsername,
    findGoogleUser: findGoogleUser,
    findUserById : findUserById
  };

  return api;

  function findUserById(userId) {
    return User.findById({_id: userId});
  }

  function createUser(user){
    return  User.create(user);
  }

  function findGoogleUser(id) {
    return User.findOne({"google.id": id});
  }

  function findUserByUsername(username) {
    return User.findOne({username: username});
  }

};
