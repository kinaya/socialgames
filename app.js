var express = require('express');
var createError = require('http-errors');
var path = require('path');
var logger = require('morgan');
var socketio = require('socket.io');
var sslRedirect = require('heroku-ssl-redirect');

// === Create the app object
var app = express();
var http = require('http');
app.server = http.createServer(app);
const io = socketio(app.server);

// === Set up the Mongoose
var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// === Add Middlewares
app.use(sslRedirect());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/client/dist')));

// === Allow cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-CSRF-Token, Content-Type, Accept");
  next();
});

// === Set up routes
var indexRouter = require('./routes/index');
var gameRouter = require('./routes/game')(io);
var fakeArtistRouter = require('./routes/fakeartist')(io); // Pass in io
var spyfallRouter = require('./routes/spyfall')(io);
app.use('/fake-artist', fakeArtistRouter);
app.use('/spyfall', spyfallRouter);
app.use('/game', gameRouter);
app.use('/', indexRouter);

// === Error handling
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {

  if (res.headersSent) {
    return next(err)
  }

  res.writeHead(err.httpStatusCode | 500, err.message, {'content-type' : 'text/plain'});
  res.end(err.message);

});

module.exports = app;
