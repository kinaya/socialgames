var mongoose = require('mongoose');

Schema = mongoose.Schema;

var GameSchema = Schema({
  code: {
    type: String,
    required: true,
    //minlength: 6,
    //maxlength: 6
  },
  fakeArtist_running: {type: Boolean, required: true, default: false},
  fakeArtist_word: {
    word: {type: String, default: ''},
    category: {type: String, default: ''}
  },
  spyfall_running: {type: Boolean, required: true, default: false}
})

module.exports = mongoose.model('Game', GameSchema);
