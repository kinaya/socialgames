import { CHANGE_WORD, SKIP_WORD, STARTSTOP_GAME, CHANGE_SETTINGS, TICK, SET_GAME_STATE, SETUP, RESET_TIMER, RESET_GAME} from '../constants'
import history from '../components/history'


/* ---------------- Fake Artist -------------------- */
import { FA_START_STOP_GAME, FA_SET_GAME_STATE, FA_CREATE_GAME, FA_SSE_ADD_REMOVE_USER, FA_ADD_REMOVE_USER_ADD, FA_ADD_REMOVE_USER_REMOVE } from '../constants'

/*
* Set gamestate
* Set the local gamestate to 'intro', 'create' or 'join' to display correct scene
*/
export function fa_setGameState(gamestate) {
  return function(dispatch) {
    dispatch({
      type: FA_SET_GAME_STATE,
      gamestate: gamestate
    })
  }
}

/*
* Create a new game
* Creates game and user on server
* Returns game and user objects that are stored in state
* User id is set in localStorage
*/
export function fa_createGame(name) {
  return function(dispatch) {

  fetch('/fake-artist/createGame', {
    method: 'POST',
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify({'name':name})
  }).then((response) => {
    if(!response.ok) {}
    return response.json();
  }).then((response) => {
    dispatch({
      type: FA_CREATE_GAME,
      game: response.game,
      user: response.user
    })
    sessionStorage.setItem('userId', response.user._id);
    sessionStorage.setItem('userName', response.user.name);
    history.push('/fake-artist/' + response.game.code);
  }).catch((error) => {
    console.log(error)
  });

  }
}

/*
* Add or remove user in a game
* Stores or remove the user on the server
* Returns the game and user objects and updates the store
*/
export function fa_addRemoveUser(addOrRemove, code, name, userId) {
  return function(dispatch) {

    fetch('/fake-artist/addRemoveUser', {
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({'addOrRemove': addOrRemove, 'code': code, 'name': name, 'userId': userId})
    }).then((response) => {
      if(!response.ok) {}
      return response.json();
    }).then((response) => {

      // If user added, save game in state, set sessionStorage and redirect to game
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

      // If user is removed, remove sessionStorage, redirect to Fake artist, remove game state and set gamestage to 'intro'
      if(addOrRemove === 'remove') {
        dispatch({
          type: FA_ADD_REMOVE_USER_REMOVE
        })
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userName');
        // Will this push a player here if they exited by clicking the logo...?
        history.push('/fake-artist');
      }

    }).catch((error) => {
      console.log(error)
    });

  }
}

/*
* Update users when new ones arrive via SSE
*/
export function fa_sse_addRemoveUser(data) {
  return function(dispatch) {
    dispatch({
      type: FA_SSE_ADD_REMOVE_USER,
      data: data
    })
  }
}

// Start or stop game
export function fa_startStopGame(startOrStop, game) {
  return function(dispatch) {

    fetch('/fake-artist/startStopGame', {
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({'startOrStop': startOrStop, 'game': game})
    }).then((response) => {
      if(!response.ok) {}
      return response.json();
    }).then((response) => {
      dispatch({
        type: FA_START_STOP_GAME,
        game: response.game,
        users: response.users,
        word: response.word
      })
    }).catch((error) => {
      console.log(error)
    });

  }
}
// SSE start game
export function fa_sse_startStopGame(data) {
  return function(dispatch) {
    dispatch({
      type: FA_START_STOP_GAME,
      game: data.game,
      users: data.users,
      word: data.word
    })
  }
}


// Reset game
export function fa_resetGame() {
  return function(dispatch) {

    // Check if sessionStorage i set
    const userName = sessionStorage.getItem('userName')
    const userId = sessionStorage.getItem('userId')

    if(userId) {

      // Remove user on server
      fetch('/fake-artist/resetGame', {
        method: 'POST',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({'userId': userId})
      }).catch((error) => {
        console.log(error)
      });

      // Remove localStorage
      sessionStorage.removeItem('userName')
      sessionStorage.removeItem('userId')

    }

    // Reset game data
    dispatch({
      type: FA_ADD_REMOVE_USER_REMOVE
    })

  }
}




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
