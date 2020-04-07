const mongoose = require('mongoose')
const Game = require('../../models/Game')
const User = require('../../models/User')

const gameOneId = new mongoose.Types.ObjectId()
const gameOne = {
  _id: gameOneId,
  code: "QWERTY",
  fakeArtist_running: false,
  spyfall_running: false
}

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
  _id: userOneId,
  name: "Anna",
  game: gameOneId
}

const setupDatabase =  async (done) => {
  await Game.deleteMany()
  await User.deleteMany()
  await new Game(gameOne).save()
  await new User(userOne).save()
  done()
}

module.exports = {
  userOneId,
  userOne,
  setupDatabase
}
