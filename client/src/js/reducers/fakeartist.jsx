import { FA_START_STOP_GAME, FA_CREATE_GAME, FA_SSE_ADD_REMOVE_USER, FA_ADD_REMOVE_USER_ADD, FA_ADD_REMOVE_USER_REMOVE, FA_SET_GAME_STATE } from '../constants'

const fakeartist = (state = [], action) => {
  let newState = JSON.parse(JSON.stringify(state))

  switch (action.type) {

    case FA_SET_GAME_STATE:
      return {
        ...state,
        gamestate: action.gamestate
      }

    case FA_START_STOP_GAME:
      newState.game.game = action.game;
      newState.game.users = action.users;
      newState.game.word = action.word;
      return newState;

    case FA_CREATE_GAME:
      newState.game.game = action.game;
      newState.game.users.push(action.user)
      return newState;

    case FA_SSE_ADD_REMOVE_USER:
      newState.game.users = action.data;
      return newState;

    case FA_ADD_REMOVE_USER_ADD:
      newState.game.game = action.game;
      newState.game.users = action.users;
      return newState;

    case FA_ADD_REMOVE_USER_REMOVE:
      newState.game.game = {}
      newState.game.users = []
      newState.gamestate = 'intro'
      return newState;

    default:
      return state
  }
}

export default fakeartist
