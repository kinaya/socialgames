var express = require('express');
var router = express.Router();
var spyfallController = require('../controllers/spyfallController');
var path = require('path');

module.exports = function(io) {

  io.of('/spyfall').on('connection', spyfallController.spyfall);

  return router;

}
