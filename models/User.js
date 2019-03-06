var mongoose = require('mongoose');
const validator = require('validator');

Schema = mongoose.Schema;

var UserSchema = Schema({
  name: {
    type: String,
    required: true,
    //trim: true
    //lowercase: true
    validate(value) {
      // Where is this shown?
      //if(!validator.isEmail(value)) {
      //  throw new Error('Username can only contain letters')
      //}
    }
  },
  game: {type: Schema.Types.ObjectId, ref: 'Game', required: true}
})

module.exports = mongoose.model('User', UserSchema);
