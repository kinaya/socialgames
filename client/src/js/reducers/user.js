import { JITSU_API, LOGIN, LOGOUT, VIDEO_MUTE_STATUS_CHANGED } from '../constants'

const initialState = {
  authenticated: false,
  user: {},
  videoMuted: false,
  jitsuApi: null
}

const user = (state = initialState, action) => {

  switch (action.type) {

    case JITSU_API:
      return {
        ...state,
        jitsuApi: action.api
      }

    case VIDEO_MUTE_STATUS_CHANGED:
      return {
        ...state,
        videoMuted: action.boolean
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
