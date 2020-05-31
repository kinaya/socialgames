import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'
import { changeGame, toggleVideo } from '../actions/gameActions'
import { connect } from 'react-redux';
import SVG from 'react-inlinesvg';

const Header = ({logout, changeGame, toggleVideo, sharedState, user, authenticated}) => {
  const [settingsState, setSettingsState] = useState('closed');

  let gameName = sharedState.game.activeGame
  if(sharedState.game.activeGame === 'werewolf') gameName = 'Varulvspelet'
  if(sharedState.game.activeGame === 'fakeartist') gameName = 'Fake Artist'
  if(sharedState.game.activeGame === 'otherwords') gameName = 'Med andra ord'
  if(sharedState.game.activeGame === 'pictionary') gameName = 'Pictionary'
  if(sharedState.game.activeGame === 'spyfall') gameName = 'Spyfall'

  const toggleSettings = () => {
    settingsState == 'closed' ? setSettingsState('open') : setSettingsState('closed')
  }

  const _changeGame = () => {
    toggleSettings()
    changeGame(null)
  }

  const _toggleVideo = () => {
    toggleSettings()
    toggleVideo(sharedState.game.video ? false : true)
  }

  return (
    <div className="site-header">

      <div className="header-bar">

        <div className="logo-container">
          <Link id="logo" to={authenticated ? {pathname: `/${user.gameCode}`} : '/'} >
            <span>Sociala</span><span>Spel</span>
          </Link>
        </div>

        {authenticated && (
          <>
            {gameName &&
              <div className="stat"><span className="label">Du spelar:</span><span className="value">{gameName}</span></div>
            }
            <div className="stat"><span className="label">Er spelkod:</span><span className="value">{user.gameCode}</span></div>
            <div className="stat"><span className="label">{sharedState.users.length} spelare:</span><span className="value">
            {sharedState.users.map((user, i, arr) => (
              <span key={user.userId}>{`${arr.length - 1 === i ? user.userName : user.userName + ', '}`}</span>
            ))}
            </span></div>
            <button id="button-settings" className="invisible" onClick={() => toggleSettings()}>
              <SVG src="/images/settings.svg" />
            </button>
          </>
        )}

      </div>

      {authenticated && (
        <div className={`settings ${settingsState}`}>

          <div className="container">
            <div>
              <span className="label">Ditt Namn:</span><span className="value">{user.userName}</span>
              <span className="label">Er spelkod:</span><span className="value">{user.gameCode}</span>
              <button className="invisible" onClick={() => logout()}>Lämna spelrummet</button>
            </div>
            <div>
              <span className="label">{sharedState.users.length} Spelare:</span>
              <ul>{sharedState.users.map(user => (
                <li key={user.userId}>{user.userName}</li>
              ))}</ul>
              <p>Bjud in fler spelare med hjälp av spelkoden</p>
            </div>
            <div className="game-settings">
              {gameName && (
                <>
                  <span className="label">Ni spelar:</span>
                  <span className="value">{gameName}</span>
                  <button className="value invisible" onClick={() => _changeGame()}>Avsluta omgången och byt spel</button>
                </>
              )}
              <span className="label">Ni spelar {sharedState.game.video ? 'med video' : 'utan video'}:</span>
              <button className="invisible" onClick={() => _toggleVideo()}>
                {sharedState.game.video ? 'Spela utan video' : 'Spela med video'}
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  )

}

const mapStateToProps = state => {
  return {
    authenticated: state.localState.user.authenticated,
    user: state.localState.user.user,
    sharedState: state.sharedState
  }
}

export default connect(
  mapStateToProps,
  { logout, changeGame, toggleVideo }
)(Header)
