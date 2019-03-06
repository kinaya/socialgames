import { SPYFALL_UPDATE_USERS, SPYFALL_UPDATE_GAME, SPYFALL_RESET_GAME } from '../constants'

const initialState = {
  game: {},
  users: []
}

const spyfall = (state = initialState, action) => {

  switch (action.type) {

    case SPYFALL_UPDATE_USERS:
      return {
        ...state,
        users: action.users
      }

    case SPYFALL_UPDATE_GAME:
      return {
        ...state,
        game: action.game
      }

    case SPYFALL_RESET_GAME:
      return initialState

    default:
      return state
  }
}

export default spyfall
