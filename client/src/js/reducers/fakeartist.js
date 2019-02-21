import { FA_RESET_GAME, FA_UPDATE_USERS, FA_UPDATE_WORD, FA_UPDATE_GAME, FA_UPDATE_USER } from '../constants'

const fakeartist = (state = [], action) => {

  switch (action.type) {

    case FA_UPDATE_USERS:
      return {
        ...state,
        game: {
          ...state.game,
          users: action.users
        }
      }

    case FA_UPDATE_GAME:
      return {
        ...state,
        game: {
          ...state.game,
          game: action.game
        }
      }

    case FA_UPDATE_USER:
      return {
        ...state,
        user: action.user
      }

    case FA_UPDATE_WORD:
        return {
          ...state,
          game: {
            ...state.game,
            word: action.word
          }
        }

    case FA_RESET_GAME:
      return {
        ...state,
        gamestate: 'intro',
        user: {},
        game: {
          ...state.game,
          game: {},
          users: [],
          word: {}
        }
      }

    default:
      return state
  }
}

export default fakeartist
