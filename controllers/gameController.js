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
 * Params: gameCode: The code for the game
 * Returns: game object
 */
var getGame = gameCode => new Promise((resolve, reject) => {
  Game.findOne({'code': gameCode}, function(err, game) {
    if(err) { reject(new Error(err)); return;}
    if(!game) { reject(new Error('Invalid game code')); return;}
    resolve(game);
  })
})

/**
* Update a game
* Params: gameCode, the code for the game
* Params: setObject, the object used for changing the game
* Returns: game object
*/
var updateGame = (gameCode, setObject) => new Promise((resolve, reject) => {
  Game.findOneAndUpdate({code: gameCode}, { $set: setObject }, { new: true }, function (err, game) {
    if(err) { reject(new Error(err)); return;}
    resolve(game);
  });
})

// todo: Make this better
/**
* Resets all games
* Params: gameCode, the code for the game
* Returns: game object
*/
var resetGames = (gameCode) => new Promise((resolve, reject) => {

  // Stop the autoamtic stepper for werewolf
  if(automaticStepper) {
    clearTimeout(automaticStepper);
  }

  const setObject = {}
  setObject['fakeArtist'] = { running: false}
  setObject['otherwords'] = { running: false}
  setObject['werewolf'] = { running: false}

  Game.findOneAndUpdate({code: gameCode}, { $set: setObject }, { new: true }, function (err, game) {
    if(err) { reject(new Error(err)); return;}
    resolve(game);
  });
})

// ===================== Fake artist ===================== //

/**
 * Starts the Fake Artist game. Adds a random word to the game, selects a
 * fake artist and sets the game to running
 * Params: gameCode, the code for the game
 * Returns: game object
 */
var startFakeArtist = (gameCode, users) => new Promise((resolve, reject) => {

  // Get a random word
  var randomWord = fakeArtistWords[Math.floor(Math.random()*fakeArtistWords.length)];

  // Select the fake artist
  const fakeArtist = users[Math.floor(Math.random()*users.length)];

  // Select the first player
  const currentPlayer = users[Math.floor(Math.random()*users.length)];

  const setObject = {
    'fakeArtist.running' : true,
    'fakeArtist.word': randomWord.word,
    'fakeArtist.category': randomWord.category,
    'fakeArtist.fakeArtist': fakeArtist.userId,
    'fakeArtist.currentPlayer': currentPlayer.userId
  }

  Game.findOneAndUpdate({code: gameCode}, { $set: setObject }, { new: true }, function (err, game) {
    if(err) { reject(new Error(err)); return;}
    resolve(game);
  });

})

/**
* Update whos turn it is
* Params: gameCode, the code for the game
* Returns: game object
*/
var nextTurn = (gameCode, users) => new Promise((resolve, reject) => {
  Game.findOne({code: gameCode}, async (err, game) => {
      if(err) { reject(new Error(err)); return };

      // Find current player index
      let i = users.findIndex(user => user.userId == game.fakeArtist.currentPlayer)

      if(i == users.length - 1) {
        i = 0;
      } else {
        i = i + 1;
      }

      game.fakeArtist.currentPlayer = users[i].userId

      game.save((err, updatedGame) => {
        if(err) {reject(new Error(err)); return};
        resolve(updatedGame);
      });

  });
})

// ===================== Werewolf ===================== //

/**
* Starts the werewolf game. Assign roles for the users and set the game to running
* Params: gameCode, the code for the game
* Users: the users in the game
* Returns: game object
*/
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

  // Append 3 extra cards
  for(let i = 0; i < 3; i++) {
    const i = Math.floor(Math.random()*characterList.length);
    const randomCharacter = characterList[i];
    characterList.splice(i, 1);
    characters.push({
      character: randomCharacter
    })
  }

  const setObject = {}
  setObject['werewolf'] = {
    running: true,
    characters: characters,
   }

  Game.findOneAndUpdate({code: gameCode}, { $set: setObject }, { new: true }, function (err, game) {
    if(err) { reject(new Error(err)); return;}
    resolve(game);
  });
})

/**
* Moves the game to the next step
* Params: gameCode, the code for the game
* Returns: game object
*/
var nextStep = (gameCode) => new Promise((resolve, reject) => {
  Game.findOne({code: gameCode}, async (err, game) => {
      if(err) { reject(new Error(err)); return };

      // Update step number
      game.werewolf.step.number = game.werewolf.step.number + 1;

      // Check if step is automatic
      game.werewolf.step.automatic = await isStepAutomatic(game.werewolf.characters, game.werewolf.step.number);

      game.save((err, updatedGame) => {
        if(err) {reject(new Error(err)); return};
        resolve(updatedGame);
      });
  });
})

// todo: case for reject
/**
* Helper function to check if a step in the game should be automatic
* Params: characters, the characters in the game
* Param: step, the step that should be checked
* Returns: true if step is automatic, false if not
*/
var isStepAutomatic = (characters, step) => new Promise((resolve, reject) => {

  let roleIsAsigned = false;
  if(step == 2) {
    roleIsAsigned = characters.some(character => character.character.name == 'Varulv' && character.userId);
  } else if(step == 3) {
    roleIsAsigned = characters.some(character => character.character.name == 'Siare' && character.userId);
  } else if(step == 4) {
    roleIsAsigned = characters.some(character => character.character.name == 'Tjuv' && character.userId);
  }

  if(step == 1 || step == 5 || roleIsAsigned) {
    resolve(false)
  } else {
    resolve(true)
  }

})

/**
* Switches two characters roles
* Params: gameCode, the code for the game
* Params: characters, the characters of the game
* Params: one, the first character to be switched
* Params: two, the second character to be switched
* Returns: game object
*/
var switchCharacters = (gameCode, characters, one, two) => new Promise((resolve, reject) => {

  let temp = characters[one].character
  characters[one].character = characters[two].character
  characters[two].character = temp

  Game.findOneAndUpdate({code: gameCode}, { $set: {'werewolf.characters': characters} }, { new: true }, function (err, game) {
    if(err) { reject(new Error(err)); return;}
    resolve(game);
  });
})

/**
 * Websocket at /game
 */
var automaticStepper = null;
exports.game = async function(io, socket) {

  // ====== Connecting ======

  // Get the gameCode from query
  const gameCode = socket.handshake.query.gameCode

  // Add user to the game room
  socket.join(gameCode)

  // Add user to our own array of users
  gameSocketCollection.push({
    socketid: socket.id,
    userName: socket.handshake.query.userName,
    userId: socket.handshake.query.userId,
    color: socket.handshake.query.color,
    gameCode: gameCode
  })

  // Get users and game and send to all clients in the game room
  var users = await getAllUsers(gameCode);
  var game = await getGame(gameCode);
  io.in(gameCode).emit('game', { users, game });

  /** ====== Disconnecting ======
  * Leave room, remove the closing client from socket
  * collection and send updated list of users to all clients in the room
  */
  socket.on('disconnecting', async () => {
    socket.leave(gameCode)
    gameSocketCollection = await gameSocketCollection.filter(client => client.socketid != socket.id)
    var users = await getAllUsers(gameCode)
    socket.to(gameCode).emit('game', { users });
  })

  /** ====== Change Game ======
  * Reset all games and change the active game
  */
  socket.on('changeGame', async (gameName) => {
    await resetGames(gameCode);
    setObject = { 'activeGame': gameName }
    var game = await updateGame(gameCode, setObject)
    io.in(gameCode).emit('game', { game })
  })

  /** ===== Toogle Video =====
  * Toggle the video true or false
  */
  socket.on('toggleVideo', async (videoState) => {
    setObject = { 'video': videoState }
    var game = await updateGame(gameCode, setObject)
    io.in(gameCode).emit('game', { game })
  })

  /** ===== Start a game =====
  * Make configurations and start a game
  */
  socket.on('startGame', async (gameName) => {
    if(gameName === 'fakeArtist') {
      var users = await getAllUsers(gameCode)
      var game = await startFakeArtist(gameCode, users);
      io.in(gameCode).emit('game', { game })
    }
    if(gameName === 'werewolf') {
      var users = await getAllUsers(gameCode)
      var game = await startWerewolf(gameCode, users);
      io.in(gameCode).emit('game', { game })
    }
  })

  /** ===== Reset all games =====
  * Resets all games
  */
  socket.on('resetGames', async () => {
    var game = await resetGames(gameCode);
    io.in(gameCode).emit('game', {game})
  })

  /** ===== Werewolf: next step =====
  * Move on to the nest step of the game.
  * If the step is automatic, set timer and run again
  */
  socket.on('nextStep', async () => {

    recursiveNextStep = async () => {
      console.log('now!')

      var game = await nextStep(gameCode)
      io.in(gameCode).emit('game', {game})

      if(!game.werewolf.step.automatic) {
        return;
      }

      let randomTime = Math.floor(Math.random() * (1500 - 7000 + 1) + 7000);
      automaticStepper = setTimeout(function () {
        recursiveNextStep()
      }, 2000)
    }

    recursiveNextStep();
  })

  /** ===== Werewolf: Switch Characters =====
  * Switch tocharacters. Does not send the updated game to the clients
  */
  socket.on('switchCharacters', async (one, two) => {
    var savedGame = await getGame(gameCode)
    var game = await switchCharacters(gameCode, savedGame.werewolf.characters, one, two)
  })

  /** ===== Werewolf: Display Characters =====
  * Displays all characters
  */
  socket.on('displayCharacters', async () => {
    var setObject = { 'werewolf.showCharacters': true}
    var game = await updateGame(gameCode, setObject)
    io.in(gameCode).emit('game', {game})
  })

  /** ===== FakeArtist: Update canvas =====
  * Update the drawing canvas
  */
  socket.on('updateCanvas', async (canvas) => {
    var setObject = { 'fakeArtist.canvas': canvas }
    var game = await updateGame(gameCode, setObject)
    socket.to(gameCode).emit('game', {game}); // Not to the person who draw!
  })

  /** ===== FakeArtist: Next turn =====
  * Update whos turn it is to draw
  */
  socket.on('nextTurn', async () => {
    var users = await getAllUsers(gameCode)
    var game = await nextTurn(gameCode, users)
    io.in(gameCode).emit('game', {game});
  })


  /** ===== FakeArtist: Toggle canvas =====
  * Update wheter to use the online canvas
  */
  socket.on('toggleCanvas', async (canvasState) => {
    var setObject = { 'canvasState': canvasState}
    var game = await updateGame(gameCode, setObject)
    io.in(gameCode).emit('game', {game});
  })

}
