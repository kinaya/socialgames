var mongoose = require('mongoose');

Schema = mongoose.Schema;

var FakeArtistWordSchema = Schema({
  word: {type: String, required: true},
  category: {type: String, required: true}
})

module.exports = mongoose.model('fakeArtistWord', FakeArtistWordSchema);
