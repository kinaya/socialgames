/* ---------------- Fake Artist -------------------- */
import { FA_RESET_GAME, FA_UPDATE_GAME, FA_UPDATE_WORD, FA_UPDATE_USERS} from '../constants'
import history from '../history'
import axios from 'axios'

// Create a new game
export const fa_createGame = userName => dispatch => {
  axios.post('/fake-artist/createGame')
  .then(response => {
    sessionStorage.setItem('userName', userName);
    sessionStorage.setItem('gameCode', response.data.game.code);
    history.push('/fake-artist/' + response.data.game.code);
  })
  .catch(error => {
    if(error.response) {
      console.log(error.response.data)
    }
  });
}

// Update the user
// TODO: THis doesnt dispatch anythin, should it ve in a different format?
export const fa_updateUser = (user) => dispatch => {
  sessionStorage.setItem('userId', user._id);
}

// Join a game
// TODO: This doesnt dispatch anything, should it be in a different format?
export const fa_joinGame = (userName, gameCode) => dispatch => {
  sessionStorage.setItem('userName', userName)
  sessionStorage.setItem('gameCode', gameCode)
  history.push('/fake-artist/' + gameCode);
}

// Update users
export const fa_updateUsers = (users) => {
  return ({
    type: FA_UPDATE_USERS,
    users: users
  })
}

// Update game
export const fa_updateGame = (game) => {
  return ({
    type: FA_UPDATE_GAME,
    game: game
  })
}

// Update word
export const fa_updateWord = (word) => {
  return ({
    type: FA_UPDATE_WORD,
    word: word
  })
}

// Reset game
export const fa_resetGame = () => dispatch => {

  sessionStorage.removeItem('userName')
  sessionStorage.removeItem('userId')
  sessionStorage.removeItem('gameCode')

  dispatch({
    type: FA_RESET_GAME
  })

}


/* ---------------- Other Words -------------------- */
import { CHANGE_WORD, SKIP_WORD, STARTSTOP_GAME, CHANGE_SETTINGS, SET_GAME_STATE, SETUP, RESET_GAME} from '../constants'

// Helper function to get a random word object
const getRandomWord = words => {
  const nonUsedWords = words.filter(word => word.used === false);
  return nonUsedWords[Math.floor(Math.random()*nonUsedWords.length)];
}

// Next word when user clickes "Next word"
export const changeWord = () => (dispatch, getState) => {
  const randomWord = getRandomWord(getState().otherwords.words);
  dispatch({
    type: CHANGE_WORD,
    currentword: randomWord
  })
}

// Setup
export const setup = () => (dispatch, getState) => {
  const randomWord = getRandomWord(getState().otherwords.words);
  const settings = getState().otherwords.settings;
  dispatch({
    type: SETUP,
    currentword: randomWord,
    settings: settings
  })
}

// Skip word when user clickes "Skip word"
export const skipWord = () => (dispatch, getState) => {
  const randomWord = getRandomWord(getState().otherwords.words);
  dispatch({
    type: SKIP_WORD,
    currentword: randomWord
  })
}
// Start game
export const startGame = () => (dispatch, getState) => {
  dispatch(setup());
  if(getState().otherwords.settings.timer != 0) {
    dispatch(startTimer());
  }
  dispatch(setGameState('play'))
}

// New Round
// TODO: Denna är ju exakt samma som startGame()
export const newRound = () => (dispatch, getState) => {
  dispatch(setup());
  if(getState().otherwords.settings.timer !=0) {
    dispatch(startTimer());
  }
  dispatch(setGameState('play'))
}

// Set game state
export const setGameState = gamestate => dispatch => {
  dispatch({
    type: SET_GAME_STATE,
    gamestate
  })
}

// Finish round
export const finishRound = () => dispatch => {
  clearInterval(timer);
  dispatch(setGameState('finished'));
}

// Reset game
export const resetGame = () => dispatch => {
  clearInterval(timer);
  dispatch({type: RESET_GAME})
}

// Change settings
export const changeSettings = (what, how) => dispatch => {
  dispatch({
    type: CHANGE_SETTINGS,
    what,
    how
  })
}

/* ---------------- Timer -------------------- */
import { TICK, RESET_TIMER} from '../constants'

// Dispatch a tick every time the function is run
export const tick = () => (dispatch, getState) => {
  dispatch({type: TICK})
  if(getState().otherwords.time <= 0) {
    clearInterval(timer);
    dispatch(setGameState('finished'));
  }
}

// Start timer and run tick every second
let timer = null;
export const startTimer = () => (dispatch, getState) => {
  dispatch({type: RESET_TIMER})
  timer = setInterval(() => dispatch(tick()), 1000);
}
