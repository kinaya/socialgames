var Game = require('../models/Game');
var User = require('../models/User');
var randomize = require('randomatic');
var mongoose = require('mongoose');
var {fakeArtistSocketCollection} = require('../socketCollection');
var fakeArtistWords = require('../data/FakeArtistWords');
var async = require('async');

/**
 * Get a game
 * Params: gameCode
 * Returns game object
 */
var getGame = gameCode => {
  return new Promise((resolve, reject) => {

    Game.findOne({'code': gameCode}, function(err, game) {
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

    Game.findOneAndUpdate({code: gameCode}, { $set: { fakeArtist_running: true }}, { new: true }, function (err, game) {
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

    Game.findOneAndUpdate({code: gameCode}, { $set: { fakeArtist_running: false }}, { new: true }, function (err, game) {
      if(err) { reject(new Error(err)); return;}
      resolve(game);
    });

  })
}

/*
 * Get all users for a game room
 * Params: gameCode
 * Returns: array of users
 */
var getAllUsers = gameCode => {
  return new Promise((resolve, reject) => {

    const users = fakeArtistSocketCollection.filter(client => client.gameCode === gameCode)
    resolve(users)

  })
}

/**
 * Add a random word to the saved game
 * Params: gameCode
 * Returns: game object
 */
var addWordToGame = (gameCode) => {
  return new Promise((resolve, reject) => {

    var randomWord = fakeArtistWords[Math.floor(Math.random()*fakeArtistWords.length)];

    Game.findOneAndUpdate({code: gameCode}, { $set: { fakeArtist_word: randomWord }}, { new: true }, function (err, game) {
      if(err) { reject(new Error(err)); return;}
      resolve(game);
    });
  })
}

/**
 * Websocket at /:id/fake-artist
 */
exports.fakeartist = async function(socket) {

  // Add user to the list of users
  fakeArtistSocketCollection.push({
    socketid: socket.id,
    userName: socket.handshake.query.userName,
    userId: socket.handshake.query.userId,
    gameCode: socket.handshake.query.gameCode,
    fakeartist: false
  })

  // Add user to a game room
  socket.join(socket.handshake.query.gameCode)

  // Get the game
  var game = await getGame(socket.handshake.query.gameCode);

  // Get all users for the game room
  var users = await getAllUsers(socket.handshake.query.gameCode);

  // Broadcast. Todo: Change to io.to(gameCode)
  socket.broadcast.to(socket.handshake.query.gameCode).emit('fakeartist', { game, users })
  socket.emit('fakeartist', { game, users})


  socket.on('startGame', async (gameCode) => {

    // Add random word to game
    await addWordToGame(gameCode);

    // Update game state
    await startGame(gameCode);

    // Get the game
    var game = await getGame(gameCode);

    // Select a Fake Artist and update fakeArtistSocketCollection
    const users = fakeArtistSocketCollection.filter(client => client.gameCode === gameCode)
    users.map(client => client.fakeartist=false)
    users[Math.floor(Math.random()*users.length)].fakeartist = true;

    // Broadcast
    socket.broadcast.to(gameCode).emit('fakeartist', { game, users })
    socket.emit('fakeartist', { game, users})
  })

  socket.on('stopGame', async (gameCode) => {

    // Update game state
    var game = await stopGame(gameCode)

    // Broadcast
    socket.broadcast.to(gameCode).emit('fakeartist', { game })
    socket.emit('fakeartist', { game })
  })

  socket.on('disconnect', async () => {

    // Get the closing client
    var closingClient = await fakeArtistSocketCollection.find(function(client) {
      return client.socketid === socket.id;
    })

    // Remove the closing client from fakeArtistSocketCollection
    fakeArtistSocketCollection = await fakeArtistSocketCollection.filter(client => client.socketid != socket.id)

    // Find out if game is running
    var error = null
    var game = await getGame(closingClient.gameCode)
    if(game.fakeArtist_running) {
      var game = await stopGame(closingClient.gameCode)
      error = 'Spelomgången stoppades eftersom en spelare lämnade spelet.'
    }

    // Get all users for the room
    var users = await getAllUsers(closingClient.gameCode)

    // Send the list of users
    socket.broadcast.to(closingClient.gameCode).emit('fakeartist', { error, game, users })

  })

}
