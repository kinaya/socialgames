var express = require('express');
var router = express.Router();
var gameController = require('../controllers/gameController');

module.exports = function(io) {

  // This sets up a 'namespace' called 'game'
  // On the client side, tell socket to connect to that namespace const socker = io('game')
  // Within each namespace you can define rooms/channels sockets can 'join' or 'leave'
  //io.of('game').on('connection', gameController.game);

  // trick we often use to break out of or create closures: function generators
  // we pass socket straight through but we capture 'game' via a closure
  // https://stackoverflow.com/questions/19559135/use-socket-io-in-controllers
  var game = io.of('game').on('connection', function (socket) {
      gameController.game(game,socket);
  });

  return router;

}
