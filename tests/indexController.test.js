const request = require('supertest')
const app = require('../app');
const Game = require('../models/Game')
const User = require('../models/User')
const mongoose = require('mongoose')
const {userOneId, userOne, gameOne, gameOneId, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Create a new game works', async (done) => {
  const response = await request(app).post('/newGame').send({
    userName: 'Alvine'
  }).expect(200) // This should really be 201 "Created"

  // Assert that the database was changes correctly
  const game = await Game.findById(response.body.game._id)
  expect(game).not.toBeNull()

  const user = await User.findOne({name: "Alvine"})
  expect(user).not.toBeNull()

  // Assertions about the response. The body should include what we specify
  expect(response.body).toMatchObject({
    user: { name: "Alvine" }
  })
  done()
})

test('Create a new game with invalid data does not work', async (done) => {
  await request(app).post('/newGame').send({
    userName: ''
  }).expect(500)
  done()
})

test('Join a game works', async (done) => {
  const response = await request(app).post('/joinGame').send({
    userName: 'Anna',
    gameCode: 'QWERTY'
  }).expect(200)

  const user = await User.findOne({name: "Anna"})
  expect(user).not.toBeNull()

  expect(response.body).toMatchObject({
    user: { name: "Anna"},
    game: { code: "QWERTY" }
  })
  done()
})

test('Joining a game with invalid data does not work', async (done) => {
  await request(app).post('/joinGame').send({
    userName: '',
    gameCode: 'QUERTY'
  }).expect(500)
  done()
})

test('Joining a game that does not exist does not work', async (done) => {
  await request(app).post('/joinGame').send({
    userName: 'Sara',
    gameCode: 'XXXXXX'
  }).expect(500)
  done()
})

test('Leaving a game works', async (done) => {
  const response = await request(app).post('/leaveGame').send({
    userId: userOneId
  }).expect(200)

  const user = await User.findById(response.body.user._id)
  expect(user).toBeNull()
  done()
})

test('Leaving a game with invalid data does not work', async (done) => {
  await request(app).post('/leaveGame').send({
    userId: 5555
  }).expect(500)
  done()
})
