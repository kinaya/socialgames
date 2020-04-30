import history from '../history'
import axios from 'axios'

import { LOGIN, LOGOUT, TOGGLE_LOCAL_VIDEO } from '../constants'

export const toggleLocalVideo = (boolean) => {
  return ({
    type: TOGGLE_LOCAL_VIDEO,
    boolean: boolean
  })
}

export const newGame = userName => async dispatch => {
  try {
    const response = await axios.post('/newGame', { userName })
    sessionStorage.setItem('userName', response.data.user.name);
    sessionStorage.setItem('userId', response.data.user._id);
    sessionStorage.setItem('gameCode', response.data.game.code);
    await dispatch ({
      type: LOGIN,
      user: {
        userName: response.data.user.name,
        userId: response.data.user._id,
        gameCode: response.data.game.code,
      }
    })
    history.push('/'+ response.data.game.code);
  } catch (err) {
    console.log(error)
  }
}

export const joinGame = (userName, gameCode) => async dispatch => {
  try {
    const response = await axios.post('/joinGame', { userName, gameCode })
    sessionStorage.setItem('userName', response.data.user.name);
    sessionStorage.setItem('userId', response.data.user._id);
    sessionStorage.setItem('gameCode', response.data.game.code);
    await dispatch ({
      type: LOGIN,
      user: {
        userName: response.data.user.name,
        userId: response.data.user._id,
        gameCode: response.data.game.code,
      }
    })
    history.push('/'+ response.data.game.code);
  } catch (err) {
    console.log(err)
    if(err.response) {
      toast.error(err.response.data)
    }
  }
}

export const logout = () => async dispatch => {
  try {
    const response = await axios.post('/leaveGame', {
      userId: sessionStorage.getItem('userId')
    })
    sessionStorage.removeItem('userName')
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('gameCode')
    dispatch ({ type: LOGOUT })
    history.push('/');
  } catch (err) {
    console.log(err)
    if(err.response) {
      toast.error(err.response.data)
    }
  }
}

export const checkUserStatus = () => async (dispatch, getState) => {
  const path = history.location.pathname;

  const authenticated = getState().user.authenticated
  const userId = sessionStorage.getItem('userId')
  const userName = sessionStorage.getItem('userName')
  const gameCode = sessionStorage.getItem('gameCode')

  // If user has data in sessionStorage but is not logged in in state. Ie if she reloaded page
  // Log her in and redirect if on /
  if(!authenticated && userId && userName && gameCode) {
    await dispatch ({
      type: LOGIN,
      user: {
        userName,
        userId,
        gameCode,
      }
    })
    if(history.location.pathname === '/') {
      history.push('/' + sessionStorage.getItem('gameCode'));
    }
  }

}
