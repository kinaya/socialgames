import { CHANGE_WORD, SKIP_WORD, STARTSTOP_GAME, CHANGE_SETTINGS, SET_GAME_STATE, SETUP, RESET_GAME} from '../constants'


// Start game
export const startGameLocal = () => (dispatch, getState) => {
  console.log('startGameLocal!')
  const settings = getState().form.otherWordsForm.values
  dispatch(setup(settings));

  if(settings.timer != 0) {
    dispatch(startTimer());
  }

  dispatch(setGameState('play'))
}

// Helper function to get a random word object
const getRandomWord = words => {
  const nonUsedWords = words.filter(word => word.used === false);
  return nonUsedWords[Math.floor(Math.random()*nonUsedWords.length)];
}

// Next word when user clickes "Next word"
export const changeWord = () => (dispatch, getState) => {
  console.log('changeWord!')
  const randomWord = getRandomWord(getState().otherwords.words);
  dispatch({
    type: CHANGE_WORD,
    currentword: randomWord
  })
}

// Setup
export const setup = (settings) => (dispatch, getState) => {
  const randomWord = getRandomWord(getState().otherwords.words);
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

// New Round
// TODO: Denna är ju exakt samma som startGame()
export const newRound = () => (dispatch, getState) => {
  dispatch(setup(getState().otherwords.settings));
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
