var mongoose = require('mongoose');
const validator = require('validator');

Schema = mongoose.Schema;

var UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  game: {type: Schema.Types.ObjectId, ref: 'Game', required: true},
  color: {type: String, required: true}
})

module.exports = mongoose.model('User', UserSchema);
