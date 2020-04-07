import { CHANGE_WORD, SKIP_WORD, TICK, SET_GAME_STATE, SETUP, CHANGE_SETTINGS, RESET_TIMER, RESET_GAME } from '../constants'
import otherWords from '../../otherWords.json'

const initialState = {
  gamestate: 'intro',
  currentword: null,
  score: 0,
  time: 30,
  settings: {
    forbidden: true,
    timer: 30
  },
  words: otherWords
}

const otherwords = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state))

  switch (action.type) {

    case SETUP:
      console.log('SETUP!')
      console.log(action)


      for(let i = 0; i < newState.words.length; i++) {
        if(newState.words[i].word === action.currentword.word) {
          newState.words[i].used = true;
        }
      }
      newState.score = 0;
      newState.time = action.settings.timer;
      newState.currentword = action.currentword;
      return newState;

    case CHANGE_WORD:
      for(let i = 0; i < newState.words.length; i++) {
        if(newState.words[i].word === action.currentword.word) {
          newState.words[i].used = true;
        }
      }
      newState.score += 1;
      newState.currentword = action.currentword;
      return newState;

    // Decrease score by one, mark word as used and change word
    case SKIP_WORD:
      for(let i = 0; i < newState.words.length; i++) {
        if(newState.words[i].word === action.currentword.word) {
          newState.words[i].used = true;
        }
      }
      if(newState.score > 0) {
        newState.score -= 1;
      }
      newState.currentword = action.currentword;
      return newState;

    case RESET_TIMER:
      newState.time = newState.settings.timer
      return newState;

    case TICK:
      newState.time -= 1
      return newState;

    case SET_GAME_STATE:
      return {
        ...state,
        gamestate: action.gamestate
      }

    case CHANGE_SETTINGS:
      if(action.what === 'timer') {
        newState.settings.timer = action.how
        return newState;
      }
      if(action.what === 'forbidden') {
        newState.settings.forbidden = action.how;
        return newState;
      }
      return {
        ...state
      }

    case RESET_GAME:
      for(let i = 0; i < newState.words.length; i++) {
        newState.words[i].used = false;
      }
      newState.settings.timer = 30;
      newState.time = 30;
      newState.score = 0;
      newState.gamestate = 'intro',
      newState.currentword = null
      return newState;

    default:
      return state
  }
}

export default otherwords
