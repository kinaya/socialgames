import { FAKEARTIST_UPDATE_USERS, FAKEARTIST_UPDATE_GAME, FAKEARTIST_RESET_GAME } from '../constants'

const initialState = {
  game: {},
  users: []
}

const fakeartist = (state = initialState, action) => {

  switch (action.type) {

    case FAKEARTIST_UPDATE_USERS:
      return {
        ...state,
        users: action.users
      }

    case FAKEARTIST_UPDATE_GAME:
      return {
        ...state,
        game: action.game
      }

    case FAKEARTIST_RESET_GAME:
      return initialState

    default:
      return state
  }
}

export default fakeartist
