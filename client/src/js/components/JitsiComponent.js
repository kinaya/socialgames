import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'

export const JitsiComponent = ({game, user, width}) => {
  const [firstRender, setFirstRender] = useState(true)

  let api;

  const startJitsu = () => {
    try {
       const domain = 'meet.jit.si';
       const options = {
        roomName: game.game.code,
        height: '800px',
        width: '100%',
        parentNode: document.getElementById('jitsi-container'),
        interfaceConfigOverwrite: {
          //filmStripOnly: true,
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
       api = new JitsiMeetExternalAPI(domain, options);

       api.addEventListener('videoConferenceJoined', () => {
         api.executeCommand('displayName', user.user.userName);
        // api.executeCommand('toggleTileView');
        //  Toggle this video!
        //api.executeCommand('toggleVideo');

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

  // Run
  useEffect(() => {
    if(!firstRender) {
      //api.executeCommand('toggleVideo');
    } else {
      setFirstRender(false)
    }
  }, [user.localVideo])

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
