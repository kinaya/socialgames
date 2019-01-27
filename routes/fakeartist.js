var express = require('express');
var router = express.Router();
var fakeArtistController = require('../controllers/fakeArtistController');

module.exports = function(wss) {

  router.post('/addWords', fakeArtistController.addWords);
  router.post('/createGame', fakeArtistController.createGame);
  router.post('/joinGame', fakeArtistController.joinGame);

  wss.on('connection', fakeArtistController.play);

  return router;

}
