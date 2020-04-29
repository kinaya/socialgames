import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'

export const JitsiComponent = ({game, user}) => {
  const [loading, setLoading] = useState(true)

  const startJitsu = () => {

    console.log(user)

    try {
       const domain = 'meet.jit.si';
       const options = {
        roomName: game.game.code,
        height: '800px',
        width: '100%',
        parentNode: document.getElementById('jitsi-container'),
        interfaceConfigOverwrite: {
          //filmStripOnly: true,
          TOOLBAR_BUTTONS: ['microphone', 'camera'],
          SHOW_JITSI_WATERMARK: false,
          DEFAULT_BACKGROUND: '#ffffff',
          DISABLE_VIDEO_BACKGROUND: true,
          DEFAULT_REMOTE_DISPLAY_NAME: 'Gäst'
        }
       };
       const api = new JitsiMeetExternalAPI(domain, options);

       //api.executeCommand('toggleTileView');
       api.addEventListener('videoConferenceJoined', () => {
         setLoading(false);
         api.executeCommand('displayName', user.user.userName);
         api.executeCommand('toggleTileView');
        });

      } catch (error) {
       console.error('Failed to load Jitsi API', error);
     }
  }

  useEffect(() => {
    if(game.game.video) {
      startJitsu();
    } else {
      //stopJitsu();
    }
  }, [game.game.video])


  return (
    <div id="jitsi-container" />
  )
}


const mapStateToProps = state => {
  return {
    game: state.game,
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  null
)(JitsiComponent)
