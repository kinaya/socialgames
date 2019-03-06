var express = require('express');
var router = express.Router();
var path = require('path');
var indexController = require('../controllers/indexController');

router.post('/newGame', indexController.newGame);
router.post('/joinGame', indexController.joinGame);
router.post('/leaveGame', indexController.leaveGame);

router.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../client/dist/index.html'));
});

module.exports = router;
