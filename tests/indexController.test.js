// export app somewhere
const rquest = require('supertest')
const app = require('../src/app')
const Game = require('../models/Game')

const gameOne = {
  gameCode: 'GHJKLI',
  fa_status: 'waiting'
}

// Runs before each test
beforeEach(async () => {
  // Make sure we use the test db! This deletes all games
  await Game.deleteMay()
  // Put one game in db to be able to test it
  await new Game(gameOne).save()
})

// Wipe data before running test! Thats why we need a separate db
test('Test create a new game', async () => {
  await request(app).post('/newGame').send({
    userName: 'Alvine'
  }).expect(201)
})

test('Should login correct', async () => {
  await request(app).post('/newUser').send({
    userName: 'Anna',
    gameCode: 'QWERTY'
  }).expect(200)
})

test('Should not log in nonexistent user')

// Two ways to test async. Add 'done' argument when testing async code
/*test('Promise based testing', (done) => {
  add(2,3).then((sum) => {
    expect(sum).toBe(5)
    done()
  })
})
test('Another sync test', async () => {
  const sum = await add(10,22)
  expect(sum).toBe(22)
})*/
