var FakeArtistGame = require('../models/fakeArtistGame');
var FakeArtistUser = require('../models/fakeArtistUser');
var randomize = require('randomatic');
var mongoose = require('mongoose');
var socketCollection = require('../socketCollection');
var fakeArtistWords = require('../../data/FakeArtistWords');
var async = require('async');

/**
 * Save a new user in the db
 * Params: userName, gameCode
 * Returns: user object
 */
var saveUser = (userName, gameCode) => {
  return new Promise((resolve, reject) => {

    FakeArtistGame.findOne({'code': gameCode}, function(err, game) {
      if(err) { reject(new Error(err)); return;}
      if(!game) { reject(new Error('Invalid game code')); return; }

      var user = new FakeArtistUser({
        name: userName,
        game: game.id
      })

      user.save(function(err) {
        if(err){ reject(new Error(err)); return;}
        resolve(user);
      })
    })

  });
};

/**
 * Remove a user from the db
 * Params: userId
 * Returns: the user
 */
var removeUser = (userId) => {
  return new Promise((resolve, reject) => {

    FakeArtistUser.findByIdAndRemove(userId, function(err, user) {
      if(err) { reject(new Error(err)); return;}
      resolve(user);
    })

  })
}

/**
 * Save a new game in the db
 * Params: none
 * Returns: game object
*/
var saveGame = () => {
  return new Promise((resolve, reject) => {

    const code = randomize('A0',6);

    var game = new FakeArtistGame({
      code: code
    });

    game.save(function(err) {
      if(err) { reject(new Error(err)); return;}
      resolve(game);
    })

  })
}

/**
 * Get a game
 * Params: gameCode
 * Returns game object
 */
var getGame = gameCode => {
  return new Promise((resolve, reject) => {

    FakeArtistGame.findOne({'code': gameCode}, function(err, game) {
      if(err) { reject(new Error(err)); return;}
      if(!game) { reject(new Error('Invalid game code')); return;}
      resolve(game);
    })

  })
}


/**
 * Start a game (set it's status to 'play')
 * Params: gameCode
 * Returns: game object
 */
var startGame = gameCode => {
  return new Promise((resolve, reject) => {

    FakeArtistGame.findOneAndUpdate({code: gameCode}, { $set: { state: 'play' }}, { new: true }, function (err, game) {
      if(err) { reject(new Error(err)); return;}
      resolve(game);
    });

  })
}

/**
 * Stop a game (set it's status to 'wating')
 * Params: gameCode
 * Returns: game object
 */
var stopGame = gameCode => {
  return new Promise((resolve, reject) => {

    FakeArtistGame.findOneAndUpdate({code: gameCode}, { $set: { state: 'waiting' }}, { new: true }, function (err, game) {
      if(err) { reject(new Error(err)); return;}
      resolve(game);
    });

  })
}

/*
 * Get all users for a game
 * Params: gameId
 * Returns: users object
 */
var getAllUsers = gameId => {
  return new Promise((resolve, reject) => {

    FakeArtistUser.find({game : gameId}).populate('game').exec(function(err, users) {
      if(err) { reject(new Error(err)); return;}
      resolve(users);
    })

  })
}

/**
 * Get a random word
 * Returns: a random word
 */
var getRandomWord = () => {
  return new Promise((resolve, reject) => {

    var randomWord = fakeArtistWords[Math.floor(Math.random()*fakeArtistWords.length)];
    resolve(randomWord);

    /*FakeArtistWord.find().exec(function(err, words) {
      if(err) { reject(new Error(err)); return;}
      var randomWord = words[Math.floor(Math.random()*words.length)];
      resolve(randomWord);
    })*/

  })
}

/**
 * Add the random word to the saved game
 * Returns: game
 */
var addWordToGame = (randomWord, gameCode) => {
  return new Promise((resolve, reject) => {

    FakeArtistGame.findOneAndUpdate({code: gameCode}, { $push: { usedWords: randomWord.word }}, { new: true }, function (err, game) {
      if(err) { reject(new Error(err)); return;}
      resolve(game);
    });
  })
}

/**
 * Remove Fake artist
 */
var removeFakeArtist = gameId => {
  return new Promise((resolve, reject) => {

    FakeArtistUser.findOneAndUpdate({game : gameId, fakeArtist: true}, {$set: {fakeArtist: false}}, {new: true}, function(err, user) {
      if(err) { reject(new Error(err)); return;}
      resolve(true);
    })

  })
}

/**
 * Save a a Fake artist
 */
var saveFakeArtist = users => {
  return new Promise((resolve, reject) => {

    var randomUser = users[Math.floor(Math.random()*users.length)];
    FakeArtistUser.findByIdAndUpdate(randomUser._id, { $set: { fakeArtist: true }}, { new: true }, function (err, user) {
      if(err) { reject(new Error(err)); return;}
      resolve(true);
    });

  })
}

/**
 * User trigged action at fake-artist/createGame - Create a game
 */
exports.createGame = async function(req, res, next) {

  try {
    var game = await saveGame();
  } catch (err) {
    return next(err);
  }

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({game}));

}

/**
 * Websocket at fake-artist/:code/play
 */
exports.play = async function(ws, req) {

  ws.on('close', async function() {

      // Get the closing client
      var closingClient = await socketCollection.find(function(client) {
        return client.key == req.headers['sec-websocket-key'];
      })

      // Remove the closing client from socketCollection
      socketCollection = await socketCollection.filter(client => client.key != req.headers['sec-websocket-key'])

      // Stop the game
      await stopGame(closingClient.gameCode);

      // Get the game
      const game = await getGame(closingClient.gameCode);

      // Remove the user
      const user = removeUser(closingClient.userId);

      // Get the remaining users after user is removed
      const users = user.then(user => {
        return getAllUsers(game._id)
      })

      // Wait until users is resolved
      users.then(users => {

        // Prepare data to send
        const data = JSON.stringify({users: users, game: game})

        // Filter out the sockets to send to
        let socketsToSendTo = socketCollection.filter((client) => {
          return client.gameCode == closingClient.gameCode;
        })

        // Send message
        socketsToSendTo.forEach(function (client) {
          client.socket.send(data);
        })

      })

  })

  ws.on('message', async function(msg){
    var msgObject = JSON.parse(msg);

    if(msgObject.type == 'opening') {

      // Save the user
      var user = await saveUser(msgObject.userName, msgObject.gameCode);

      // Add the new connection to the array
      socketCollection.push({
        userId: user._id,
        gameCode: msgObject.gameCode,
        key: req.headers['sec-websocket-key'],
        socket: ws,
      });

      // Get the game
      var game = await getGame(msgObject.gameCode);

      // Get all users for the game
      var users = await getAllUsers(game._id);

      // Send an update to the opening client with the user
      const userData = JSON.stringify({user: user})
      ws.send(userData)

      // Prepare the data
      const data = JSON.stringify({game: game, users: users})

      // Get the clients to send to
      let socketsToSendTo = socketCollection.filter((client) => {
        return client.gameCode === msgObject.gameCode;
      })

      // Send message
      socketsToSendTo.forEach(function (client) {
        client.socket.send(data);
      })

    }

    if(msgObject.type == 'startGame') {

      // Get a random word that hasn't been used before in the game
      var game = await getGame(msgObject.gameCode)
      var randomWord = null
      while(randomWord == null) {
        word = await getRandomWord();
        if(!(game.usedWords).includes(word.word)) {
          randomWord = word;
        }
      }

      // Add random word to game
      await addWordToGame(randomWord, msgObject.gameCode);

      // Update game state
      await startGame(msgObject.gameCode);

      // Get the game
      var game = await getGame(msgObject.gameCode);

      // Remove Fake Artist
      await removeFakeArtist(game._id);

      // Get all users
      var users = await getAllUsers(game._id);

      // Save a fake artist in the db
      await saveFakeArtist(users);

      // Get all users again
      var users = await getAllUsers(game._id);

      // Prepare the data
      const data = JSON.stringify({game: game, users: users, word: randomWord})

      // Filter out the sockets to send to
      let socketsToSendTo = socketCollection.filter((client) => {
        return client.gameCode === msgObject.gameCode;
      })

      // Send message
      socketsToSendTo.forEach(function (client) {
        client.socket.send(data);
      })

    }

    if(msgObject.type == 'stopGame') {

      // Stop the game
      var game = await stopGame(msgObject.gameCode);

      // Prepare the data
      const data = JSON.stringify({game: game})

      // Filter out the sockets to send to
      let socketsToSendTo = socketCollection.filter((client) => {
        return client.gameCode === msgObject.gameCode;
      })

      // Send message
      socketsToSendTo.forEach(function (client) {
        client.socket.send(data);
      })

    }

  });
}
