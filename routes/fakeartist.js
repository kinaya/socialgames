var express = require('express');
var router = express.Router();
var fakeArtistController = require('../controllers/fakeArtistController');
var path = require('path');

module.exports = function(io) {

  //io.on('connection', fakeArtistController.fakeartist);

  io.of('/fake-artist').on('connection', fakeArtistController.fakeartist);

  return router;

}
