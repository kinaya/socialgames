import React, { useEffect, useState, useRef } from 'react'
import GameList from './GameList'
import JoinGameForm from './JoinGameForm'
import { connect } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import OtherWords from './otherwords/OtherWords'
import Werewolf from './werewolf/Werewolf'
import FakeArtist from './fakeartist/FakeArtist'
import history from '../history';
import { updateUsers } from '../actions/gameActions'
import { wsConnect, wsDisconnect } from '../actions/websocketActions'
import ReactLoading from 'react-loading'
import JitsiComponent from './JitsiComponent'
import { Resizable } from 're-resizable'

const GameArea = ({user, match, sharedState, authenticated, updateUsers, wsConnect, wsDisconnect }) => {
  const [width, setWidth] = useState(400)
  const [wideVideo, setWideVideo] = useState(false)

  // Resize the video
  const resize = (e, direction, ref, d) => {
    setWidth(previousWidth =>  previousWidth + d.width);
  }

  // Check if videVideo
  // todo: run this on window resize as well
  useEffect(() => {
    if((window.innerWidth - width) > 700) {
      setWideVideo(true)
    } else {
      setWideVideo(false)
    }
  }, [width, window.innerWidth])

  useEffect(() => {
    // TODO: check so state/sessionStorage match in update in App.js
    const userName = user.user.userName
    const userId = user.user.userId
    const gameCode = user.user.gameCode
    const color = user.user.color
    const host = `${BASE_URL}/game`;
    const queryObject = {query: {userName, userId, color, gameCode}}

    wsConnect(host, queryObject)

    return () => {
      wsDisconnect()
    }
  }, [authenticated])

  if(Object.entries(sharedState.game).length === 0 && authenticated || Object.entries(sharedState.game).length != 0 && !authenticated) {
    return <ReactLoading />
  }

  return (
    <div className={`gameArea ${sharedState.game.video ? 'video' : 'no-video'} ${sharedState.game.video && wideVideo ? 'wide-video' : ''}`}>

      {sharedState.game.video && (
        <Resizable
          className="videoContainer"
          defaultSize={{width: 400}}
          enable={{top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}}
          onResizeStop={(e, direction, ref, d) => resize(e, direction, ref, d)}
        >
          <JitsiComponent />
        </Resizable>
      )}

      <div className="gameContainer">

        {authenticated && sharedState.game.activeGame === 'werewolf' && (
          <Werewolf />
        )}

        {authenticated && sharedState.game.activeGame === 'fakeartist' && (
          <FakeArtist />
        )}

        {authenticated && sharedState.game.activeGame === 'otherwords' && (
          <OtherWords />
        )}

        {authenticated && !sharedState.game.activeGame && (
          <div className="container wide">
            <h1>Välj spel</h1>
            <GameList gameCode={match.params.id}/>
          </div>
        )}

        {!authenticated && (
          <div>
            <h1>Gå med i ett spel</h1>
            <JoinGameForm initialValues={{code: match.params.id}} />
          </div>
        )}

      </div>
    </div>
  )

}

const mapStateToProps = state => {
  return {
    authenticated: state.localState.user.authenticated,
    sharedState: state.sharedState,
    user: state.localState.user
  }
}

export default connect(
  mapStateToProps,
  { updateUsers, wsConnect, wsDisconnect }
)(GameArea)
