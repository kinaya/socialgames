var Game = require('../models/Game');
var User = require('../models/User');
var randomize = require('randomatic');
var mongoose = require('mongoose');
var async = require('async');

/**
 * Save a new user in the db
 * Params: userName, gameCode
 * Returns: user object
 */
var saveUser = (userName, gameCode, color) => new Promise((resolve, reject) => {

  Game.findOne({'code': gameCode}, function(err, game) {
    if(err) { reject(new Error(err)); return;}
    if(!game) {
      reject(new Error('Invalid game code')); return;
    }

    var user = new User({
      name: userName,
      game: game.id,
      color: color
    })

    user.save(function(err) {
      if(err){ reject(new Error(err)); return;}
      resolve(user);
    })

  })

});


// get an unused color!
// Only return colors!
var getUnusedColor = (gameId) => new Promise((resolve, reject) => {

  User.find({game: gameId}, 'name color', function(err, users) {
    colors = ["black", "red", "yellow", "green", "blue", "purple"];

    if(users.length == 0) {
      resolve(colors[0])
    }

    takenColors = []
    for(user of users) {
      takenColors.push(user.color);
    }
    notTakenColors = colors.filter(color => !takenColors.includes(color))
    resolve(notTakenColors[0])
  })

})


/**
 * Remove a user from the db
 * Params: userId
 * Returns: the user
 */
var removeUser = (userId) => new Promise((resolve, reject) => {
  User.findByIdAndRemove(userId, function(err, user) {
    if(err) { reject(new Error(err)); return;}
    resolve(user);
  })
})

/**
 * Save a new game in the db
 * Params: none
 * Returns: game object
*/
var saveGame = () => new Promise((resolve, reject) => {

  const code = randomize('A0',6)

  var game = new Game({
    code: code
  });

  game.save(function(err) {
    if(err) { reject(new Error(err)); return;}
    resolve(game);
  })

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

/**
 * User trigged action at /newGame - Create a new game
 */
exports.newGame = async function(req, res, next) {

  try {
    var game = await saveGame();
    var color = await getUnusedColor(game._id);
    var user = await saveUser(req.body.userName, game.code, color);
  } catch (err) {
    return next(err);
  }

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({game, user}));

}

/**
 * User trigged action at /joinGame - Join an existing game
 */
exports.joinGame = async function(req, res, next) {

  const gameCode = req.body.gameCode.toUpperCase();

  try {
    var game = await getGame(gameCode)
    var color = await getUnusedColor(game._id);
    var user = await saveUser(req.body.userName, gameCode, color);
    var game = await getGame(gameCode);
  } catch (err) {
    return next(err);
  }

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({game, user}));

}

/**
 * User trigged action to leave Game/Logout - Delete user
 */
exports.leaveGame = async function(req, res, next) {

  try {
    var user = await removeUser(req.body.userId);
  } catch (err) {
    return next(err);
  }

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({user}));

}
