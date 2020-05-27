var express = require('express');
var router = express.Router();
var gameController = require('../controllers/gameController');

module.exports = function(io) {

  // Set up namespace 'game'. Connect to io('game') on client side
  // Use function generator to break out of closure. Pass socket straight trough
  // but capture 'game' via a closure
  // https://stackoverflow.com/questions/19559135/use-socket-io-in-controllers
  var game = io.of('game').on('connection', function (socket) {
      gameController.game(game,socket);
  });

  return router;

}
