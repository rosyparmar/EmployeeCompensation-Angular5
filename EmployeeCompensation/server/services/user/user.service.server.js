/**
 * Created by Rosy Parmar on 4/14/18.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");


module.exports = function (app, models) {

  var userModel = models.userModel;

  app.post("/api/createUser", register);
  app.post("/api/logout", logout);
  app.post ('/api/loggedIn', loggedIn);
  app.post('/api/login', passport.authenticate('local'), login);

  passport.use(new LocalStrategy(localStrategy));
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  function localStrategy(username, password, done) {
    userModel
      .findUserByUsername(username)
      .then(
        function (user) {
          if (user && bcrypt.compareSync(password, user.password)) {
            console.log("Authentic User" , user);
            return done(null, user);
          } else {
            return done(null, false);
          }
        },
        function (err) {
          res.sendStatus(400).send(err);
        });
  }

  function login(req, res) {
    var user = req.user;
    res.json(user);
  }

  function createUser(req, res) {

    var user = req.body;
    userModel
      .createUser(user)
      .then(
        function (user) {
          res.json(user);
        },
        function (error) {
          res.statusCode(400).send(error);
        }
      )
  }

  function findUserByUsername(username, res) {
    userModel
      .findUserByUsername(username)
      .then(function (user) {
          res.json(user);
        },
        function (err) {
          res.statusCode(404).send(err);
        });
  }

  function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
      .findUserByUsername(user.username)
      .then(function (data) {
        if(data){
          res.status(400).send('Username is in use!');
          return;
        } else{
          userModel
            .createUser(user)
            .then(
              function(user){
                if(user){
                  req.login(user, function(err) {
                    if(err) {
                      res.status(400).send(err);
                    } else {
                      res.json(user);
                    }
                  });
                }
              }
            );
        }
      })
  }

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    userModel
      .findUserById(user._id)
      .then(
        function(user){
          done(null, user);
        },
        function(err){
          done(err, null);
        }
      );
  }

  function logout(req, res) {
    req.logout();
    res.send(200); //success
  }

  function loggedIn(req, res) {
    res.send(req.isAuthenticated() ? req.employee : '0');
  }

  // function googleLogin(token, refreshToken, profile, done) {
  //   // response.send(200);
  //   userModel
  //     .findGoogleUser(profile.id)
  //     .then(
  //       function(googleUser) {
  //         if (googleUser) {
  //           return done(null, googleUser);
  //         }
  //         else {
  //           var email = profile.emails[0].value;
  //           var splitEmail = email.split("@");
  //           var googleUser = {
  //             username: splitEmail[0],
  //             firstName: profile.name.givenName,
  //             lastName: profile.name.familyName,
  //             email: email,
  //             google: {
  //               id: profile.id,
  //               token: token
  //             }
  //           };
  //           userModel
  //             .createUser(googleUser)
  //             .then(
  //               function(user) {
  //                 done(null, user);
  //               }
  //             );
  //         }
  //       }
  //     );
  // }

  function loggedIn(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  }


};

