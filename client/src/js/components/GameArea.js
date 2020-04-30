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

const GameArea = ({user, match, game, authenticated, updateUsers, wsConnect, wsDisconnect }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [width, setWidth] = useState(400)

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

  return (
    <div className={`gameArea ${game.game.video ? 'video' : 'no-video'}`}>

      {game.game.video && (
        <Resizable className="videoContainer"
          defaultSize={{width: 400}}
          enable={{top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}}
        >
          <JitsiComponent />
        </Resizable>
      )}

      <div className="gameContainer">

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
  { updateUsers, wsConnect, wsDisconnect }
)(GameArea)
