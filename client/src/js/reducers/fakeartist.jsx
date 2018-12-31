import { FA_START_STOP_GAME, FA_CREATE_GAME, FA_SSE_ADD_REMOVE_USER, FA_ADD_REMOVE_USER_ADD, FA_ADD_REMOVE_USER_REMOVE, FA_SET_GAME_STATE } from '../constants'

const fakeartist = (state = [], action) => {

  switch (action.type) {

    case FA_SET_GAME_STATE:
      return {
        ...state,
        gamestate: action.gamestate
      }

    case FA_START_STOP_GAME:
      return {
        ...state,
        game: {
          ...state.game,
          game: action.game,
          users: action.users,
          word: action.word
        }
      }

    case FA_CREATE_GAME:
      return {
        ...state,
        game: {
          ...state.game,
          game: action.game,
          users: [...state.game.users, action.user]
        }
      }

    case FA_SSE_ADD_REMOVE_USER:
      return {
        ...state,
        game: {
          ...state.game,
          users: action.data
        }
      }

    case FA_ADD_REMOVE_USER_ADD:
      return {
        ...state,
        game: {
          ...state.game,
          game: action.game,
          users: action.users
        }
      }

    case FA_ADD_REMOVE_USER_REMOVE:
      return {
        ...state,
        game: {
          ...state.game,
          game: {},
          users: [],
          gamestate: 'intro'
        }
      }

    default:
      return state
  }
}

export default fakeartist
