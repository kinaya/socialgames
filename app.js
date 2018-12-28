// Used for storing environmental variables in an .env file in root
require('dotenv').load();

// Require plugins
var express = require('express');
var createError = require('http-errors');
var path = require('path');
var logger = require('morgan');

// Set up routes
//var apiRouter = require('./routes/api');
//var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');
//var userRouter = require('./routes/user');

// Create the app object
var app = express();

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

// Passport
//require('./config/passport')(app);

// Allow cors. Must be before we define our routes
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-CSRF-Token, Content-Type, Accept");
  next();
});

// Add the previously imported routehandling code to handling chain
//app.use('/api', passport.authenticate('jwt', {session: false}), apiRouter);
//app.use('/auth', authRouter);
//app.use('/user', passport.authenticate('jwt', {session: false}), userRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // Todo: What is thsi?
  if (res.headersSent) {
    return next(err)
  }

  // Set the httpStatusCode and statusText of the error
  res.writeHead(err.httpStatusCode | 500, err.message, {'content-type' : 'text/plain'});
  res.end(err.message);

});

// Export the module
module.exports = app;
