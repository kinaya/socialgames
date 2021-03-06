import { TOGGLE_CURTAIN, JITSU_API, LOGIN, LOGOUT } from '../constants'

const initialState = {
  authenticated: false,
  user: {},
  videoMuted: false,
  jitsuApi: null,
  curtain: false
}

const user = (state = initialState, action) => {

  switch (action.type) {

    case JITSU_API:
      return {
        ...state,
        jitsuApi: action.api
      }

    case TOGGLE_CURTAIN:
      return {
        ...state,
        curtain: action.boolean
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
