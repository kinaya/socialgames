var mongoose = require('mongoose');

Schema = mongoose.Schema;

var FakeArtistUserSchema = Schema({
  name: {type: String, required: true},
  game: {type: Schema.Types.ObjectId, ref: 'fakeArtistGame', required: true},
  fakeArtist: {type: Boolean, default: false }
})

module.exports = mongoose.model('fakeArtistUser', FakeArtistUserSchema);
