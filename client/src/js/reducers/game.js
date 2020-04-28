import { ADD_PEER, UPDATE_PEERS, UPDATE_USERS, UPDATE_GAME } from '../constants'

const initialState = {
  game: {
    id: null,
    code: null,
    activeGame: null,
    video: false
  },
  users: [],
  peers: []
}

const game = (state = initialState, action) => {
  switch (action.type) {

    case ADD_PEER:
      return {
        ...state,
        peers: [...state.peers, action.peer]
      }

    case UPDATE_PEERS:
      return {
        ...state,
        peers: action.peers
      }

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
