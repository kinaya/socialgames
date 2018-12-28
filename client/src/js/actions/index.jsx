import { CHANGE_WORD, SKIP_WORD, STARTSTOP_GAME, CHANGE_SETTINGS, TICK, SET_GAME_STATE, SETUP, RESET_TIMER, RESET_GAME} from '../constants'

// Helper function to get a random word object
function getRandomWord(words) {
  const nonUsedWords = words.filter(word => word.used === false);
  return nonUsedWords[Math.floor(Math.random()*nonUsedWords.length)];
}

// Skip word
// Used when user clickes "Next word" in game play
export function changeWord() {
  return function(dispatch, getState) {
    const randomWord = getRandomWord(getState().otherwords.words);
    dispatch({
      type: CHANGE_WORD,
      currentword: randomWord
    })
  }
}

export function setup() {
  return function(dispatch, getState) {
    const randomWord = getRandomWord(getState().otherwords.words);
    const settings = getState().otherwords.settings;
    dispatch({
      type: SETUP,
      currentword: randomWord,
      settings: settings
    })
  }
}

// Skip word
// Used when user cklickes "Skip word" in game play
export function skipWord() {
  return function(dispatch, getState) {
    const randomWord = getRandomWord(getState().otherwords.words);
    dispatch({
      type: SKIP_WORD,
      currentword: randomWord
    })
  }
}

// Dispatch a tick every time the function is run
// If time is at zero, clear the timer interval
export function tick() {
  return function(dispatch, getState) {
    dispatch({
      type: TICK
    })
    if(getState().otherwords.time <= 0) {
      clearInterval(timer);
      dispatch(setGameState('finished'));
    }
  }
}

let timer = null;
export function startTimer() {
  return function(dispatch, getState) {
    dispatch({
      type: RESET_TIMER
    })
    // Run the tick function every second
    timer = setInterval(() => dispatch(tick()), 1000);
  }
}

// Start game
// Run when user clicks "Start" button on intro-page
export function startGame() {
  return function(dispatch, getState) {
    // Run setup
    dispatch(setup());
    // Start timer if not off
    if(getState().otherwords.settings.timer != 0) {
      dispatch(startTimer());
    }
    // Set game state to 'play'
    dispatch(setGameState('play'))
  }
}

// New Round
// TODO: Denna är ju exakt samma som startGame() nu...
export function newRound() {
  return function(dispatch, getState) {
    // Run setup
    dispatch(setup());
    // Start timer if not off
    if(getState().otherwords.settings.timer !=0) {
      dispatch(startTimer());
    }
    // Set game state to "play"
    dispatch(setGameState('play'))
  }
}

// Set game state
// Used when the timer runs out, or as helper function
export function setGameState(gamestate) {
  return function(dispatch, getState) {
    dispatch({
      type: SET_GAME_STATE,
      gamestate: gamestate
    })
  }
}

// Finish round
// Run when user clicks "Finish round" in an active game in play mode
export function finishRound() {
  return function(dispatch) {
    // Stop timer
    clearInterval(timer);
    // Change game stage to 'finished'
    dispatch(setGameState('finished'));
  }
}

// Reset game
// Run when user clicks "Stop game" in the finished screen
// or if user closes the OtherWords component
export function resetGame() {
  return function(dispatch) {
    // Stop timer
    clearInterval(timer);
    // Reset game
    dispatch({
      type: RESET_GAME
    })
  }
}

export function changeSettings(what, how) {
  return function(dispatch) {
    dispatch({
      type: CHANGE_SETTINGS,
      what: what,
      how: how
    })
  }
}
