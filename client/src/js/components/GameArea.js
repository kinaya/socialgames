import React, { useEffect, useState } from 'react'
import GameList from './GameList'
import JoinGameForm from './JoinGameForm'
import { connect } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import OtherWords from './otherwords/OtherWords'
import Werewolf from './werewolf/Werewolf'
import FakeArtist from './fakeartist/FakeArtist'
import history from '../history';
//import io from "socket.io-client";
import { updateUsers } from '../actions/gameActions'
import { addUserStream } from '../actions/streamActions'
import { wsConnect, wsDisconnect } from '../actions/websocketActions'
import ReactLoading from 'react-loading'
import VideoContainer from './VideoContainer'
import Jitsi from 'react-jitsi'

const GameArea = ({user, match, game, authenticated, updateUsers, wsConnect, wsDisconnect, addUserStream}) => {
  const [isLoading, setIsLoading] = useState(true)

  // This is run on mount and if video setting change
  useEffect(() => {
    //if(game.game.video) {
      const videoConstraints = {
          height: window.innerHeight / 2,
          width: window.innerWidth / 2
      };
      navigator.mediaDevices.getUserMedia({video: videoConstraints, audio: true }).then(stream => {
        addUserStream(stream)
      })
    /*} else {
      addUserStream(null)
    }*/
  }, [game.game.video])


  // Runs on mount
  useEffect(() => {
    setIsLoading(true)
    // TODO: check so state/sessionStorage match in update in App.js
    const userName = user.user.userName
    const userId = user.user.userId
    const gameCode = user.user.gameCode
    const host = `${BASE_URL}/game`;
    const queryObject = {query: {userName, userId, gameCode}}

    wsConnect(host, queryObject)

    // TODO: how to wait until socket is connected and game/user state fetched?
    setIsLoading(false)

    return () => {
      wsDisconnect()
    }
  }, [])

  if(isLoading) {
    return <ReactLoading />
  }

//  <VideoContainer />

  const interfaceConfig = {
    TOOLBAR_BUTTONS: ['microphone', 'camera']
  }

  return (
    <div>

      {game.game.video && (
        <Jitsi loadingComponent={ReactLoading} interfaceConfig={interfaceConfig} roomName={user.user.gameCode} displayName={user.user.userName} />
      )}

      {authenticated && game.game.activeGame === 'werewolf' && (
        <Werewolf />
      )}

      {authenticated && game.game.activeGame === 'fakeartist' && (
        <FakeArtist />
      )}

      {authenticated && game.game.activeGame === 'otherwords' && (
        <OtherWords />
      )}

      {authenticated && !game.game.activeGame && (
        <div>
          <div className="ui info message">
            <h2>Bjud in spelare</h2>
            <p className="code"><span>Spelkod:</span> {match.params.id}</p>
            <h2>Spelare som är med:</h2>
            <ul>
            {game.users.map(user => (
              <li key={user.userId}>{user.userName}</li>
            ))}
            </ul>
          </div>
          <GameList gameCode={match.params.id}/>
        </div>
      )}

      {!authenticated && (
        <div>
          <h1 className="heading">Gå med i ett spel</h1>
          <JoinGameForm initialValues={{code: match.params.id}} />
        </div>
      )}

    </div>
  )
}

const mapStateToProps = state => {
  return {
    authenticated: state.user.authenticated,
    game: state.game,
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { updateUsers, wsConnect, wsDisconnect, addUserStream }
)(GameArea)
