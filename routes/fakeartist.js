var express = require('express');
var router = express.Router();

// Get Fake Artist Controller
var fakeArtistController = require('../controllers/fakeArtistController');

router.post('/addWords', fakeArtistController.addWords);
router.post('/createGame', fakeArtistController.createGame);
router.post('/joinGame', fakeArtistController.joinGame);
router.ws('/:code/play', fakeArtistController.play);

module.exports = router;
