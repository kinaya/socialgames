var mongoose = require('mongoose');

Schema = mongoose.Schema;

var FakeArtistGameSchema = Schema({
  code: {type: String, required: true},
  state: {type: String, required: true, default: 'waiting'},
  usedWords: [{type: String}]
})

module.exports = mongoose.model('fakeArtistGame', FakeArtistGameSchema);