import { ADD_USER_STREAM, LOGIN, LOGOUT } from '../constants'

const initialState = {
  authenticated: false,
  user: {},
  stream: null
}

const user = (state = initialState, action) => {

  switch (action.type) {

    case ADD_USER_STREAM:
      return {
        ...state,
        stream: action.stream
      }

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
