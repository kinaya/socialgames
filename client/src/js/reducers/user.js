import { LOGIN, LOGOUT } from '../constants'

const initialState = {
  authenticated: false,
  user: {}
}

const user = (state = initialState, action) => {

  switch (action.type) {

    case LOGIN:
      return {
        ...state,
        authenticated: true,
        user: action.user
      }

    case LOGOUT:
      return {
        ...state,
        authenticated: false,
        user: {},
        stream: null
      }

    default:
      return state
  }
}

export default user
