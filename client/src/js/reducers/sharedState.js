import { UPDATE_USERS, UPDATE_GAME } from '../constants'

const initialState = {
  game: {},
  users: []
}

const game = (state = initialState, action) => {
  switch (action.type) {

    case UPDATE_USERS:
      return {
        ...state,
        users: action.users
      }

    case UPDATE_GAME:
      return {
        ...state,
        game: action.game
      }

    default:
      return state
  }
}

export default game
