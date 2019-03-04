var express = require('express');
var router = express.Router();
var fakeArtistController = require('../controllers/fakeArtistController');
var path = require('path');

module.exports = function(wss) {

  router.post('/createGame', fakeArtistController.createGame);

  wss.on('connection', fakeArtistController.play);

  return router;

}
