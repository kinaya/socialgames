var mongoose = require('mongoose');

Schema = mongoose.Schema;

var GameSchema = Schema({
  code: { type: String, required: true },
  activeGame: { type: String, default: null },
  video: {type: Boolean, default: false },
  canvasState: {type: Boolean, default: true},
  fakeArtist: {
    running: {type: Boolean, required: true, default: false},
    word: {type: String, default: ''},
    category: {type: String, default: ''},
    fakeArtist: {type: Schema.Types.ObjectId, ref: 'User'},
    canvas: {type: String, default: ''},
    currentPlayer: {type: Schema.Types.ObjectId, ref: 'User'}
  },
  spyfall: {
    running: {type: Boolean, required: true, default: false}
  },
  otherwords: {
    running: {type: Boolean, required: true, default: false}
  },
  werewolf: {
    running: {type: Boolean, required: true, default: false},
    showCharacters: {type: Boolean, required: true, default: false},
    characters: {type: Array, default: []},
    step: {
      number: {type: Number, default: 1},
      automatic: {type: Boolean, default: false}
    }
  },
  pictionary: {
    running: {type: Boolean, required: true, default: false}
  }
})

module.exports = mongoose.model('Game', GameSchema);
