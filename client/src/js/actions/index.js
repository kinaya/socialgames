import { LOGIN, LOGOUT } from '../constants'
import history from '../history'
import axios from 'axios'
import { toast } from 'react-toastify';

/* --------------- Social games app ----------------- */

// Create a new game
export const sga_newGame = userName => dispatch => {
  axios.post('/newGame', {
    userName
  })
  .then(response => {
    sessionStorage.setItem('userName', response.data.user.name);
    sessionStorage.setItem('userId', response.data.user._id);
    sessionStorage.setItem('gameCode', response.data.game.code);
    dispatch ({
      type: LOGIN
    })
    history.push('/'+ response.data.game.code);
  })
  .catch(error => {
    if(error.response) {
      console.log(error.response.data)
    }
  });
}

// Join a game
export const sga_joinGame = (userName, gameCode) => dispatch => {
  axios.post('/joinGame', {
    userName,
    gameCode
  })
  .then(response => {
    sessionStorage.setItem('userName', response.data.user.name);
    sessionStorage.setItem('userId', response.data.user._id);
    sessionStorage.setItem('gameCode', response.data.game.code);
    dispatch ({
      type: LOGIN
    })
    history.push('/'+ response.data.game.code);
  })
  .catch(error => {
    if(error.response) {
      toast.error(error.response.data)
    }
  });
}

// Logout
export const sga_logout = () => dispatch => {
  axios.post('/leaveGame', {
    userId: sessionStorage.getItem('userId')
  })
  .then(response => {
    sessionStorage.removeItem('userName')
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('gameCode')
    dispatch ({
      type: LOGOUT
    })
    history.push('/');
  })
  .catch(error => {
    if(error.response) {
      console.log(error.response.data)
    }
  });
}

// Check user Status
export const checkUserStatus = () => (dispatch, getState) => {
  const path = history.location.pathname;

  // If user is logged in, but lost state
  if(!getState().authenticated && sessionStorage.getItem('userId') && sessionStorage.getItem('userName') && sessionStorage.getItem('gameCode')) {
    dispatch ({
      type: LOGIN
    })
    if(history.location.pathname == '/') {
      history.push('/'+ sessionStorage.getItem('gameCode'));
    }
  }

}

/* ----------- Fake artist ---------------*/
import { FAKEARTIST_UPDATE_GAME, FAKEARTIST_UPDATE_USERS, FAKEARTIST_RESET_GAME} from '../constants'

// Update users
export const fakeArtist_updateUsers = (users) => {
  return ({
    type: FAKEARTIST_UPDATE_USERS,
    users: users
  })
}

// Update game
export const fakeArtist_updateGame = (game) => {
  return ({
    type: FAKEARTIST_UPDATE_GAME,
    game: game
  })
}

// Reset game
export const fakeArtist_resetGame = () => dispatch => {
  dispatch({
    type: FAKEARTIST_RESET_GAME
  })
}



/*---------Spyfall ------------*/
import { SPYFALL_UPDATE_GAME, SPYFALL_UPDATE_USERS, SPYFALL_RESET_GAME} from '../constants'

// Update users
export const spyfall_updateUsers = (users) => {
  return ({
    type: SPYFALL_UPDATE_USERS,
    users: users
  })
}

// Update game
export const spyfall_updateGame = (game) => {
  return ({
    type: SPYFALL_UPDATE_GAME,
    game: game
  })
}

// Reset game
export const spyfall_resetGame = () => dispatch => {
  dispatch({
    type: SPYFALL_RESET_GAME
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
