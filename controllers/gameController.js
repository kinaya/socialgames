var Game = require('../models/Game');
var User = require('../models/User');
var mongoose = require('mongoose');
var { gameSocketCollection } = require('../socketCollection');
var fakeArtistWords = require('../data/FakeArtistWords');
var werewolfCharacters = require('../data/WerewolfCharacters')
var werewolfCharacterMap = require('../data/WerewolfCharacterMap')
var async = require('async');

/*
 * Get all users for a game room
 * Params: gameCode
 * Returns: array of users
 */
var getAllUsers = gameCode => new Promise((resolve, reject) => {
  const users = gameSocketCollection.filter(user => user.gameCode === gameCode)
  resolve(users)
})

/**
 * Get a game
 * Params: gameCode
 * Returns game object
 */
var getGame = gameCode => new Promise((resolve, reject) => {
  Game.findOne({'code': gameCode}, function(err, game) {
    if(err) { reject(new Error(err)); return;}
    if(!game) { reject(new Error('Invalid game code')); return;}
    resolve(game);
  })
})

var changeGame = (gameCode, game) => new Promise((resolve, reject) => {
  Game.findOneAndUpdate({code: gameCode}, { $set: { activeGame: game }}, { new: true }, function (err, game) {
    if(err) { reject(new Error(err)); return;}
    resolve(game);
  });
})

var toogleVideo = (gameCode, boolean) => new Promise((resolve, reject) => {
  Game.findOneAndUpdate({code: gameCode}, { $set: {video: boolean}}, { new: true}, function (err, game) {
    if(err) { reject(new Error(eerr)); return;}
    resolve(game);
  })
})

// TODO: Slå ihop startGame/stopGame eller kanske ha en generell "UpdateGame?"
var startGame = (gameCode, gameName) => new Promise((resolve, reject) => {
  const setObject = {}
  setObject[gameName] = { running: true }
  Game.findOneAndUpdate({code: gameCode}, { $set: setObject }, { new: true }, function (err, game) {
    if(err) { reject(new Error(err)); return;}
    resolve(game);
  });
})

// Reset the game so all that is left is running: false
// Bättre sätt att resetta alla spel!
var resetGames = (gameCode) => new Promise((resolve, reject) => {
  const setObject = {}
  setObject['fakeArtist'] = { running: false}
  setObject['otherwords'] = { running: false}
  setObject['spyfall'] = { running: false}
  setObject['werewolf'] = { running: false}
  setObject['pictionary'] = { running: false}
  //setObject[gameName] = {running: false}
  Game.findOneAndUpdate({code: gameCode}, { $set: setObject }, { new: true }, function (err, game) {
    if(err) { reject(new Error(err)); return;}
    resolve(game);
  });
})


/**
 * Add a random word to the saved game
 * Params: gameCode
 * Returns: game object
 */
var addWordToGame = (gameCode, users) => new Promise((resolve, reject) => {

  // Get a random word
  var randomWord = fakeArtistWords[Math.floor(Math.random()*fakeArtistWords.length)];

  // Select the fake artist
  const fakeArtist = users[Math.floor(Math.random()*users.length)];

  const setObject = {}
  setObject['fakeArtist'] = {
    running: true,
    word: randomWord.word,
    category: randomWord.category,
    fakeArtist: fakeArtist.userId
   }

  Game.findOneAndUpdate({code: gameCode}, { $set: setObject }, { new: true }, function (err, game) {
    if(err) { reject(new Error(err)); return;}
    resolve(game);
  });
})


var displayCharacters = (gameCode) => new Promise((resolve, rejeect) => {
  Game.findOneAndUpdate({code: gameCode}, { $set: { 'werewolf.showCharacters': true} }, { new: true }, function (err, game) {
    if(err) { reject(new Error(err)); return;}
    resolve(game);
  });
})

var nextStep = (gameCode) => new Promise((resolve, rejeect) => {

  // Something to call nextStep again in 10 (5-15?) seconds if no one has this role

  Game.findOneAndUpdate({code: gameCode}, { $inc: { 'werewolf.step.number': 1} }, { new: true }, function (err, game) {
    if(err) { reject(new Error(err)); return;}
    resolve(game);
  });
})


var startWerewolf = (gameCode, users) => new Promise((resolve, reject) => {

  // Get the characterlist according to number of players, and make a copy of it to manipulate
  let characterList = [...werewolfCharacterMap.find(list => list.players === users.length).list]

  // Populate list with description
  characterList.forEach(function(name, i) {
    const item = werewolfCharacters.find(character => character.name === name)
    this[i] = item
  }, characterList);

  // Set the players characters
  characters = []
  for(user of users) {
    const i = Math.floor(Math.random()*characterList.length);
    const randomCharacter = characterList[i];
    characterList.splice(i, 1);
    characters.push({
      userId: user.userId,
      character: randomCharacter,
      playerName: user.userName
    })
  }

  // Set the middle cards
  middleCards = []
  for(let i = 0; i < 3; i++) {
    const i = Math.floor(Math.random()*characterList.length);
    const randomCharacter = characterList[i];
    characterList.splice(i, 1);
    middleCards.push({
      userId: [i],
      character: randomCharacter
    })
  }

  const setObject = {}
  setObject['werewolf'] = {
    running: true,
    characters: characters,
    middleCards: middleCards
   }

  Game.findOneAndUpdate({code: gameCode}, { $set: setObject }, { new: true }, function (err, game) {
    if(err) { reject(new Error(err)); return;}
    resolve(game);
  });
})



/**
 * Websocket at /game
 */
exports.game = async function(io, socket) {

  console.log('This socket joined:', socket.id)

  // Get the gameCode from query
  const gameCode = socket.handshake.query.gameCode

  // Add user to the game room
  socket.join(gameCode)

  // Add user to our own array of users
  gameSocketCollection.push({
    socketid: socket.id,
    userName: socket.handshake.query.userName,
    userId: socket.handshake.query.userId,
    gameCode: gameCode,
  })

  // Get all users for the game room
  var users = await getAllUsers(gameCode);

  // Get the game
  var game = await getGame(gameCode);

  // Send updated game and list of users to all clients in 'gameCode' room, including sender
  io.in(gameCode).emit('game', { users, game });

  // Send the 'existingusers' message to the newly added user, for creating Peers
  io.to(socket.id).emit('existingusers', users);

  socket.on('sendingsignal', data => {
    // This signal i of typ "offer". It is sent by the joining user to the existing ones
    console.log(`${data.callerID} sendingsignal to ${data.userToSignal}`)
    console.log('The signal:', data.signal)
    io.to(data.userToSignal).emit('userjoined', {signal: data.signal, callerID: data.callerID, callerName: data.callerName})
  })

  socket.on('returningsignal', data => {
    // This signal is of type "answer". It is sent by the existing user to the new one
    console.log(`${socket.id} receivingreturnedsignal to ${data.callerID}`)
    console.log('The signal:', data.signal)
    io.to(data.callerID).emit('receivingreturnedsignal', {signal: data.signal, id: socket.id})
  })

  socket.on('disconnecting', async () => {
    // Leave room
    socket.leave(gameCode)
    // Remove the closing client from fakeArtistSocketCollection
    gameSocketCollection = await gameSocketCollection.filter(client => client.socketid != socket.id)
    // Get all users for the room
    var users = await getAllUsers(gameCode)
    // Sending to all clients in 'gameCode' room, except sender
    socket.to(gameCode).emit('game', { users });
  })

  // Change the active game
  socket.on('changeGame', async (gameName) => {
    await resetGames(gameCode);
    var game = await changeGame(gameCode, gameName);
    io.in(gameCode).emit('game', { game })
  })

  // Toogle the video
  socket.on('toggleVideo', async (boolean) => {
    var game = await toogleVideo(gameCode, boolean);
    io.in(gameCode).emit('game', { game })
  })

  // Start a game
  socket.on('startGame', async (gameName) => {

    if(gameName === 'fakeArtist') {
      var users = await getAllUsers(gameCode)
      var game = await addWordToGame(gameCode, users); // Also: running and select the fakeArtist!
      io.in(gameCode).emit('game', { game })
    }

    if(gameName === 'werewolf') {
      var users = await getAllUsers(gameCode)
      var game = await startWerewolf(gameCode, users);
      io.in(gameCode).emit('game', { game })
    }

    //var game = await startGame(gameCode, gameName);
    //io.in(gameCode).emit('game', {game})
  })

  // next step
  socket.on('nextStep', async () => {
    var game = await nextStep(gameCode)
    io.in(gameCode).emit('game', {game})
  })

  // display characters
  socket.on('displayCharacters', async () => {
    var game = await displayCharacters(gameCode)
    io.in(gameCode).emit('game', {game})
  })

  // Reset/Stop a game
  socket.on('resetGames', async () => {
    var game = await resetGames(gameCode);
    io.in(gameCode).emit('game', {game})
  })

}
