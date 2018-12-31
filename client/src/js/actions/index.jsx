/* ---------------- Fake Artist -------------------- */
import { FA_START_STOP_GAME, FA_SET_GAME_STATE, FA_CREATE_GAME, FA_SSE_ADD_REMOVE_USER, FA_ADD_REMOVE_USER_ADD, FA_ADD_REMOVE_USER_REMOVE } from '../constants'
import history from '../components/history'
const defaultHeader = {'Accept':'application/json', 'Content-Type': 'application/json'}

// Set the local gamestate
export const fa_setGameState = gamestate => dispatch => {
  dispatch({type: FA_SET_GAME_STATE, gamestate})
}

// Create a new game
export const fa_createGame = name => dispatch => {
  fetch('/fake-artist/createGame', {
    method: 'POST',
    headers: defaultHeader,
    body: JSON.stringify({'name':name})
  })
  .then(response => response.json())
  .then(response => {
    dispatch({
      type: FA_CREATE_GAME,
      game: response.game,
      user: response.user
    })
    sessionStorage.setItem('userId', response.user._id);
    sessionStorage.setItem('userName', response.user.name);
    history.push('/fake-artist/' + response.game.code);
  })
  .catch(error => console.log(error));
}

// Add or remove a user
export const fa_addRemoveUser = (addOrRemove, code, name, userId) => dispatch => {
  fetch('/fake-artist/addRemoveUser', {
    method: 'POST',
    headers: defaultHeader,
    body: JSON.stringify({'addOrRemove': addOrRemove, 'code': code, 'name': name, 'userId': userId})
  }).then(response => response.json())
    .then(response => {

    if(addOrRemove === 'add') {
      dispatch({
        type: FA_ADD_REMOVE_USER_ADD,
        game: response.game,
        users: response.users
      })
      sessionStorage.setItem('userId', response.user._id);
      sessionStorage.setItem('userName', response.user.name);
      history.push('/fake-artist/' + response.game.code);
    }

    if(addOrRemove === 'remove') {
      dispatch({
        type: FA_ADD_REMOVE_USER_REMOVE
      })
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('userName');
      history.push('/fake-artist');
    }

  })
  .catch(error => console.log(error));
}

// Update users when new ones arrive via SSE
export const fa_sse_addRemoveUser = data => dispatch => {
  dispatch({
    type: FA_SSE_ADD_REMOVE_USER,
    data: data
  })
}

// Start or stop game
export const fa_startStopGame = (startOrStop, game) => dispatch => {

  fetch ('/fake-artist/startStopGame', {
    method: 'POST',
    headers: defaultHeader,
    body: JSON.stringify({'startOrStop': startOrStop, 'game': game})
  })
  .then(response => response.json())
  .then(data => {
    dispatch({
      type: FA_START_STOP_GAME,
      game: data.game,
      users: data.users,
      word: data.word
    })
  })
  .catch(error => console.log(error))
}

// SSE start or stop game
export const fa_sse_startStopGame = data => dispatch => {
  dispatch({
    type: FA_START_STOP_GAME,
    game: data.game,
    users: data.users,
    word: data.word
  })
}

// Reset game
export const fa_resetGame = () => dispatch => {

  // Check if sessionStorage i set
  const userName = sessionStorage.getItem('userName')
  const userId = sessionStorage.getItem('userId')

  if(userId) {

    // Remove user on server
    fetch('/fake-artist/resetGame', {
      method: 'POST',
      headers: defaultHeader,
      body: JSON.stringify({'userId': userId})
    })
    .catch(error => console.log(error));

    // Remove localStorage
    sessionStorage.removeItem('userName')
    sessionStorage.removeItem('userId')

  }

  // Reset game data
  dispatch({ type: FA_ADD_REMOVE_USER_REMOVE })

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
