/**
 * Created by Rosy Parmar on 4/13/18.
 */
// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

// loading authentication modules
const passport      = require('passport');
const cookieParser  = require('cookie-parser');
const session       = require('express-session');

app.use(session({
  secret: 'this is the secret',
  resave: true,
  saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


var connectionString = 'mongodb://127.0.0.1:27017/employeeDatabase';
var mongoose = require("mongoose");
mongoose.connect( connectionString);

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist -- For building
app.use(express.static(path.join(__dirname, 'src')));

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// For Build: When we build, we serve this for dist
const api = require('./server/routes/api.js');

// Set our api routes
app.use('/api', api);


// Get port from environment and store in Express.
const port = '9000' ;
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);


//Server side API
var serverSide = require('./server/app.js');
serverSide(app);



// For Build: Catch all other routes and return the index file
app.use('*', function (req, res) {
  const index = path.join(__dirname, 'src', 'index.html');
  res.sendFile(index);
});


var PPORT = process.env.PORT || port;

//Listen on provided port, on all network interfaces.
//server.listen(process.env.PORT , () => console.log(`API running on localhost:${port}`)); //-- working on heroku
server.listen(PPORT , () => console.log(`API running on localhost:${port}`)); //-- working on LocalHost
