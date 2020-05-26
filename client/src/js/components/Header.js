import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'
import { changeGame, toggleVideo } from '../actions/gameActions'
import { connect } from 'react-redux';
import ReactSVG from 'react-svg';

const Header = ({logout, changeGame, toggleVideo, game, user, authenticated}) => {
  const [settingsState, setSettingsState] = useState('closed');

  let gameName = game.game.activeGame
  if(game.game.activeGame === 'werewolf') gameName = 'Varulvspelet'
  if(game.game.activeGame === 'fakeartist') gameName = 'Fake Artist'
  if(game.game.activeGame === 'otherwords') gameName = 'Med andra ord'
  if(game.game.activeGame === 'pictionary') gameName = 'Pictionary'
  if(game.game.activeGame === 'spyfall') gameName = 'Spyfall'

  const toggleSettings = () => {
    settingsState == 'closed' ? setSettingsState('open') : setSettingsState('closed')
  }

  const _changeGame = () => {
    toggleSettings()
    changeGame(null)
  }

  const _toggleVideo = () => {
    toggleSettings()
    toggleVideo(game.game.video ? false : true)
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
            <div className="stat"><span className="label">Spelkod:</span><span className="value">{user.gameCode}</span></div>
            {gameName &&
              <div className="stat"><span className="label">Aktivt spel:</span><span className="value">{gameName}</span></div>
            }
            <div className="stat"><span className="label">{game.users.length} spelare:</span><span className="value">
            {game.users.map((user, i, arr) => (
              <span key={user.userId}>{`${arr.length - 1 === i ? user.userName : user.userName + ', '}`}</span>
            ))}
            </span></div>
            <button id="button-settings" className="invisible" onClick={() => toggleSettings()}>
              <ReactSVG src="/images/settings.svg" />
            </button>
          </>
        )}

      </div>

      {authenticated && (
        <div className={`settings ${settingsState}`}>

          <div className="container">
            <div>
              <span className="label">Ditt Namn:</span><span className="value">{user.userName}</span>
              <span className="label">Spelkod:</span><span className="value">{user.gameCode}</span>
              <a onClick={() => logout()}>Lämna spelet</a>
            </div>
            <div>
              <span className="label">Spelare:</span>
              <ul>{game.users.map(user => (
                <li key={user.userId}>{user.userName}</li>
              ))}</ul>
            </div>
            <div>
              {gameName && (
                <button className="ui inverted button" onClick={() => _changeGame()}>Byt spel</button>
              )}
              <button className="ui inverted button" onClick={() => _toggleVideo()}>
                {game.game.video ? 'Spela utan video' : 'Spela med video'}
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
    authenticated: state.user.authenticated,
    user: state.user.user,
    game: state.game
  }
}

export default connect(
  mapStateToProps,
  { logout, changeGame, toggleVideo }
)(Header)
