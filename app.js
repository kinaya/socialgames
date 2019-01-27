// Used for storing environmental variables in an .env file in root
require('dotenv').load();

// A module that stores the connections in Memory
var socketCollection = require('./socketCollection');

// Require plugins
var express = require('express');
var createError = require('http-errors');
var path = require('path');
var logger = require('morgan');

// Create the app object
var app = express();
// Added fix: https://github.com/HenningM/express-ws/issues/104
var http = require('http');
app.server = http.createServer(app);

// npm package 'ws'
var WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({server:app.server, path: '/fake-artist/play'});

// Set up routes
const server = app.server;
var indexRouter = require('./routes/index');
var fakeArtistRouter = require('./routes/fakeartist')(wss); // Pass in wss

// Set up the mongoose connection
var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Call app.use to add middleware libraries
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/dist')));

// Allow cors. Must be before we define our routes
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-CSRF-Token, Content-Type, Accept");
  next();
});

// Add the previously imported routehandling code to handling chain
app.use('/fake-artist', fakeArtistRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  if (res.headersSent) {
    return next(err)
  }
  //res.status(500)
  //console.log(err);
  //res.render('error', { error: err })
  //res.json({ : err })
  //res.status(500).send({error: err})

  // Set the httpStatusCode and statusText of the error
  res.writeHead(err.httpStatusCode | 500, err.message, {'content-type' : 'text/plain'});
  res.end(err.message);

});

// Export the module
module.exports = app;
