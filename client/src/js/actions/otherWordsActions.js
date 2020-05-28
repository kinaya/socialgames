import { CHANGE_WORD, SKIP_WORD, STARTSTOP_GAME, CHANGE_SETTINGS, SET_GAME_STATE, SETUP, RESET_GAME} from '../constants'

// Start game local
export const startGameLocal = () => (dispatch, getState) => {

  const settings = getState().form.otherWordsForm.values

  const randomWord = getRandomWord(getState().localState.otherwords.words);

  dispatch({
    type: SETUP,
    currentword: randomWord,
    settings: settings
  })

  if(settings.timer != 0) {
    dispatch(startTimer());
  }

  dispatch({
    type: SET_GAME_STATE,
    gamestate: 'play'
  })

}

// Helper function to get a random word object
const getRandomWord = (words) => {
  const nonUsedWords = words.filter(word => word.used === false);
  return nonUsedWords[Math.floor(Math.random()*nonUsedWords.length)];
}

// Next word when user clickes "Next word"
export const changeWord = () => (dispatch, getState) => {
  const randomWord = getRandomWord(getState().localState.otherwords.words);
  dispatch({
    type: CHANGE_WORD,
    currentword: randomWord
  })
}

// Skip word when user clickes "Skip word"
export const skipWord = () => (dispatch, getState) => {
  const randomWord = getRandomWord(getState().localState.otherwords.words);
  dispatch({
    type: SKIP_WORD,
    currentword: randomWord
  })
}

// Finish round
export const finishRound = () => dispatch => {
  clearInterval(timer);
  dispatch({
    type: SET_GAME_STATE,
    gamestate: 'finished'
  })
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
  if(getState().localState.otherwords.time <= 0) {
    clearInterval(timer);
    dispatch({
      type: SET_GAME_STATE,
      gamestate: 'finished'
    })
  }
}

// Start timer and run tick every second
let timer = null;
export const startTimer = () => (dispatch, getState) => {
  dispatch({type: RESET_TIMER})
  timer = setInterval(() => dispatch(tick()), 1000);
}
