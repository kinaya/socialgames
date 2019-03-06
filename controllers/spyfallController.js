var Game = require('../models/Game');
var User = require('../models/User');
var mongoose = require('mongoose');
var {spyfallSocketCollection} = require('../socketCollection');
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

/*
 * Get all users for a game room
 * Params: gameCode
 * Returns: array of users
 */
var getAllUsers = gameCode => {
  return new Promise((resolve, reject) => {

    const users = spyfallSocketCollection.filter(client => client.gameCode === gameCode)
    resolve(users)

  })
}

/**
 * Websocket at /:id/spyfall
 */
exports.spyfall = async function(socket) {

  // Add user to the list of users
  spyfallSocketCollection.push({
    socketid: socket.id,
    userName: socket.handshake.query.userName,
    userId: socket.handshake.query.userId,
    gameCode: socket.handshake.query.gameCode,
    spy: false
  })

  // Add user to a game room
  socket.join(socket.handshake.query.gameCode)

  // Get the game
  var game = await getGame(socket.handshake.query.gameCode);

  // Get all users for the game room
  var users = await getAllUsers(socket.handshake.query.gameCode);

  // Broadcast. Todo: Change to io.to(gameCode)
  // Todo: I can just use message...? It will only arrive to spyfall-clients anyway?
  socket.broadcast.to(socket.handshake.query.gameCode).emit('spyfall', { game, users })
  socket.emit('spyfall', { game, users})


  socket.on('disconnect', async () => {

    // Get the closing client
    var closingClient = await spyfallSocketCollection.find(function(client) {
      return client.socketid === socket.id;
    })

    // Remove the closing client from fakeArtistSocketCollection
    spyfallSocketCollection = await spyfallSocketCollection.filter(client => client.socketid != socket.id)

    // Stop the game
    var game = await stopGame(closingClient.gameCode)

    // Get all users for the room
    var users = await getAllUsers(closingClient.gameCode)

    // Send the list of users
    socket.broadcast.to(closingClient.gameCode).emit('spyfall', { users })
  })

}
