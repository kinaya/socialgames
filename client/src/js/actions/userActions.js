import history from '../history'
import axios from 'axios'
import { toast } from 'react-toastify';

import { TOGGLE_CURTAIN, LOGIN, LOGOUT, JITSU_API } from '../constants'

export const toggleCurtain = (boolean) => {
  return ({
    type: TOGGLE_CURTAIN,
    boolean: boolean
  })
}

export const startJitsu = (roomName, userName) => async dispatch => {
  try {
     const domain = 'meet.jit.si';
     const options = {
      roomName: roomName,
      height: '800px',
      width: '100%',
      parentNode: document.getElementById('jitsi-container'),
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: ['microphone', 'camera', 'tileview'],
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        SHOW_BRAND_WATERMARK: false,
        DEFAULT_BACKGROUND: '#ffffff',
        DISABLE_VIDEO_BACKGROUND: true,
        DEFAULT_REMOTE_DISPLAY_NAME: 'Gäst',
        // https://github.com/jitsi/jitsi-meet/issues/5142
        TILE_VIEW_MAX_COLUMNS: 1,
        disableDeepLinking: true
      }
     };
     const api = await new JitsiMeetExternalAPI(domain, options);

     api.addEventListener('videoConferenceJoined', () => {
       api.executeCommand('displayName', userName);
       api.executeCommand('toggleTileView');
     });

     api.addEventListener('videoMuteStatusChanged', (data) => {
       dispatch ({
         type: VIDEO_MUTE_STATUS_CHANGED,
         boolean: data.muted
       })
     })

     await dispatch ({
       type: JITSU_API,
       api: api
     })

    } catch (error) {
     console.error('Failed to load Jitsi API', error);
   }
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

  const authenticated = getState().localState.user.authenticated
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
