import { TOGGLE_VIDEO, UPDATE_USERS, UPDATE_GAME, CHANGE_GAME, START_GAME, RESET_GAMES } from '../constants'

export const updateUsers = (users) => {
  return ({
    type: UPDATE_USERS,
    users: users
  })
}

export const resetGames = () => {
  return ({
    type: RESET_GAMES
  })
}

export const updateGame = (game) => {
  return ({
    type: UPDATE_GAME,
    game: game
  })
}

export const toggleVideo = (boolean) => {
  return ({
    type: TOGGLE_VIDEO,
    boolean: boolean
  })
}

export const changeGame = (gameName) => {
  return ({
    type: CHANGE_GAME,
    gameName: gameName
  })
}

export const startGame = (gameName) => {
  return ({
    type: START_GAME,
    gameName: gameName
  })
}
