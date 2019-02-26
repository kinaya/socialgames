import { FA_RESET_GAME, FA_UPDATE_USERS, FA_UPDATE_WORD, FA_UPDATE_GAME } from '../constants'

const initialState = {
  game: {},
  users: [],
  word: {}
}

const fakeartist = (state = initialState, action) => {

  switch (action.type) {

    case FA_UPDATE_USERS:
      return {
        ...state,
        users: action.users
      }

    case FA_UPDATE_GAME:
      return {
        ...state,
        game: action.game
      }

    case FA_UPDATE_WORD:
        return {
          ...state,
          word: action.word
        }

    case FA_RESET_GAME:
      return initialState

    default:
      return state
  }
}

export default fakeartist
