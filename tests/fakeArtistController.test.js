const request = require('supertest')
const app = require('../app');
const Game = require('../models/Game')
const User = require('../models/User')
const mongoose = require('mongoose')
const {userOneId, userOne, gameOne, gameOneId, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('tets', () => {

})
