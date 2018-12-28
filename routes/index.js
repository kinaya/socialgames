var express = require('express');
var router = express.Router();
var path = require('path');

// Serve the index.html fron the client/dist folder
router.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../client/dist/index.html'));
});

module.exports = router;
