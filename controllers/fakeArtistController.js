var FakeArtistGame = require('../models/fakeArtistGame');
var FakeArtistUser = require('../models/fakeArtistUser');
var FakeArtistWord = require('../models/fakeArtistWord');
var randomize = require('randomatic');
var mongoose = require('mongoose');
//var ObjectId = require('mongoose').Types.ObjectId;
var async = require('async');

// Add words
exports.addWord = function(req, res, next) {

// Expected format
// [
//  {"word":"broccoli","category":"food"},
//  {"word":"broccoli","category":"food"}
// ]

  for(let i = 0; i < req.body.length; i++) {

    FakeArtistWord.findOne({word:req.body[i].word}, function(err, word) {
      if(err){return next(err);}

      // If word does not exist
      if(!word) {
        var newWord = new FakeArtistWord({
          word: req.body[i].word,
          category: req.body[i].category
        })
        newWord.save(function(err) {
          if(err){return next(err);}
        })
      }
    })

  }

  res.send('Words saved');

}

// Create a new game
exports.createGame = function(req, res, next) {

  // Generate a random game code
  const code = randomize('A0',6);

  // Todo: Check if gamecode is already in use

  // Create the game
  var game = new FakeArtistGame({
    code: code
  });
  game.save(function(err) {
    if(err){return next(err);}
  })

  // Create the new user
  var user = new FakeArtistUser({
    name: req.body.name,
    game: game.id
  })
  user.save(function(err) {
    if(err){return next(err);}
  })

  // Return game and user
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({game, user}));
}

// Delete a game
exports.deleteGame = function(req, res, next) {

  // Find the game and delete
  FakeArtistGame.findOneAndRemove({'code': req.body.code}, function(err, game) {
    if(err) { return next(err);}
    res.setHeader('Content-Type', 'application/json');
    res.sendStatus(200);
  })

}

// Add or remove a user
exports.addRemoveUser = function(req, res, next) {

    async.waterfall([

      // Add or remove the user
      function(callback) {
        FakeArtistGame.findOne({'code': req.body.code}, function(err, game) {
          if(err) { return next(err);}

          if(!game) {
            return next("Invalid game code");
          }

          // Create the user
          if(req.body.addOrRemove === 'add' ) {
            var user = new FakeArtistUser({
              name: req.body.name,
              game: game.id
            })
            user.save(function(err) {
              if(err){return next(err);}
              callback(null, user, game)
            })
          }

          // Delete the user
          if(req.body.addOrRemove === 'remove') {
            FakeArtistUser.findByIdAndRemove(req.body.userId, function(err, user) {
              if(err){return next(err);}
              callback(null, user, game)
            })
          }

        })
      },

      // Find all users belonging to the game, send to SSE
      function(user, game, callback) {
        FakeArtistUser.find({game : game.id}).populate('game').exec(function(err, users) {
          if(err) { return next(err); }
          req.app.emit('addRemoveUser', {
            users: users,
            game: game
          });
          callback(null, user, game, users);
        })
      }

    ], function(err, user, game, users) {
      if(err) {
        next(err);
      }
      // Return game and user
      res.setHeader('Content-type', 'application/json');
      res.send(JSON.stringify({game, users, user}));
    })

}

// Start of stop the game
exports.startStopGame = function(req, res, next) {

  async.waterfall([

    // Find the game that should start or stop and update it's state
    function(callback) {

      if(req.body.startOrStop === 'start') {
        FakeArtistGame.findByIdAndUpdate(req.body.game._id, { $set: { state: 'play' }}, { new: true }, function (err, game) {
          if (err) { return next(err); }
          callback(null, game)
        });
      }

      if(req.body.startOrStop === 'stop') {
        FakeArtistGame.findByIdAndUpdate(req.body.game._id, { $set: { state: 'waiting' }}, { new: true }, function (err, game) {
          if (err) { return next(err); }
          callback(null, game)
        });
      }

    },

    // Find the users in the game
    function(game, callback) {
      FakeArtistUser.find({game : game.id}).populate('game').exec(function(err, users) {
        if(err) { return next(err); }
        callback(null, game, users);
      })
    },

    // Select one user as Fake artist or remove the fake artist
    function(game, users, callback) {

      if(req.body.startOrStop === 'start') {
        var randomUser = users[Math.floor(Math.random()*users.length)];
        FakeArtistUser.findByIdAndUpdate(randomUser._id, { $set: { fakeArtist: true }}, { new: true }, function (err, user) {
          if (err) { return next(err); }
          callback(null, game)
        });
      }

      if(req.body.startOrStop === 'stop') {
        FakeArtistUser.findOneAndUpdate({game : game.id, fakeArtist: true}, {$set: {fakeArtist: false}}, {new: true}, function(err, user) {
          if(err) { return next(err); }
          callback(null, game)
        })
      }

    },

    // Get all words
    function(game, callback) {
      FakeArtistWord.find().exec(function(err, words) {
        if(err) { return next(err);}
        callback(null, game, words)
      })
    },

    // Get a random word
    function(game, words, callback) {
      var randomWord = words[Math.floor(Math.random()*words.length)];
      FakeArtistWord.findById(randomWord._id, function(err, word) {
        if(err) { return next(err);}
        callback(null, game, word);
      })
    },

    // Find all the users in the game again
    function(game, word, callback) {
      FakeArtistUser.find({game : game.id}).populate('game').exec(function(err, users) {
        if(err) { return next(err); }
        callback(null, game, word, users);
      })
    },

    // Send game and users as SSE
    function(game, word, users, callback) {
      req.app.emit('startStopGame', {
        game: game,
        users: users,
        word: word
      });
      callback(null, game, word, users)
    },

  // Send game and users to front
], function(err, game, word, users) {
    if(err) { next(err);}
    // Return game
    res.setHeader('Content-type', 'application/json');
    res.send(JSON.stringify({game, users, word}));
  })

}

exports.resetGame = function(req, res, next) {

  async.waterfall([

    // Find the user and get the game
    function(callback) {
      FakeArtistUser.findById(req.body.userId).populate('game').exec(function(err, user) {
        if(err) { return next(err);}
        const game = user.game;
        callback(null, user, game)
      })
    },

    // Remove the user
    function(user, game, callback) {
      FakeArtistUser.findByIdAndRemove(user._id, function(err, user) {
        if(err) {return next(err);}
        callback(null, user, game)
      })
    },

    // Get all users in game, send to SSE
    function(user, game, callback) {
      FakeArtistUser.find({game : game._id}).populate('game').exec(function(err, users) {
        if(err) { return next(err); }
        req.app.emit('addRemoveUser', {
          users: users
        });
        callback(null, user, game, users);
      })
    }

  ], function(err, user, game, users) {
    if(err) { next(err);}
    // Return game and user
    res.setHeader('Content-type', 'application/json');
    res.send(JSON.stringify({game, users, user}));
  })
}

exports.events = function(req, res, next) {

  // Close the connection when the client stops listening
  req.on('close', () => {
    if(!res.finished) {
      res.end();
      console.log('Stopped sending events');
    }
  });

  // Prepare the headers
  res.set({
  	'Content-Type': 'text/event-stream',
  	'Cache-Control': 'no-cache',
  	'Connection': 'keep-alive'
  });

  // Start game
  req.app.on('startStopGame', data => {
    if(!res.finished) {

      // Sending data to game with correct id
      res.write('event: ' + JSON.stringify(data.game._id) + 'startStopGame\n');
      res.write('data: ' + JSON.stringify(data) + '\n\n')

    }
  })

  // Listen for emitted "message" events and send SSE data when received
  req.app.on('addRemoveUser', data => {
    if(!res.finished) {

      // Sending data to game with correct id
      res.write('event: ' + JSON.stringify(data.game._id) + 'addRemoveUser\n');
      res.write('data: ' + JSON.stringify(data) + '\n\n')

    }
  });

  // event to send to client that connection is closed, so it can also close the connection
  // res.witer('event: closedConnection\n');

}
