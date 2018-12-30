var express = require('express');
var router = express.Router();

// Get Fake Artist Controller
var fakeArtistController = require('../controllers/fakeArtistController');

// Create routes for Fake Artist
router.get('/events', fakeArtistController.events);

router.post('/createGame', fakeArtistController.createGame);
router.post('/deleteGame', fakeArtistController.deleteGame);
router.post('/addRemoveUser', fakeArtistController.addRemoveUser);
router.post('/startStopGame', fakeArtistController.startStopGame);
router.post('/resetGame', fakeArtistController.resetGame);

router.post('/addWord', fakeArtistController.addWord);

module.exports = router;
