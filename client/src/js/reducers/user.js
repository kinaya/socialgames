import { LOGIN, LOGOUT, TOGGLE_LOCAL_VIDEO } from '../constants'

const initialState = {
  authenticated: false,
  user: {},
  localVideo: true
}

const user = (state = initialState, action) => {

  switch (action.type) {

    case TOGGLE_LOCAL_VIDEO:
      return {
        ...state,
        localVideo: !state.localVideo
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
