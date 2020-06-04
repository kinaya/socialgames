import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'
import { changeGame, toggleVideo } from '../actions/gameActions'
import { connect } from 'react-redux';
import SVG from 'react-inlinesvg';

const Header = ({logout, changeGame, toggleVideo, sharedState, user, authenticated}) => {
  const [settingsState, setSettingsState] = useState('closed');
  const [menuState, setMenuState] = useState('closed');

  let gameName = sharedState.game.activeGame
  if(sharedState.game.activeGame === 'werewolf') gameName = 'Varulvspelet'
  if(sharedState.game.activeGame === 'fakeartist') gameName = 'Fake Artist'
  if(sharedState.game.activeGame === 'otherwords') gameName = 'Med andra ord'
  if(sharedState.game.activeGame === 'pictionary') gameName = 'Pictionary'
  if(sharedState.game.activeGame === 'spyfall') gameName = 'Spyfall'

  const _toggleSettings = () => {
    settingsState == 'closed' ? setSettingsState('open') : setSettingsState('closed')
  }

  const _toggleMenu = () => {
    menuState == 'closed' ? setMenuState('open') : setMenuState('closed')
  }

  const _changeGame = () => {
    //toggleSettings()
    changeGame(null)
  }

  const _toggleVideo = () => {
    //toggleSettings()
    toggleVideo(sharedState.game.video ? false : true)
  }

  return (
    <div className={`site-header ${menuState}`}>

      <div className="header-bar">

        <Link id="logo" to={authenticated ? {pathname: `/${user.gameCode}`} : '/'} >
          <img src="images/logo.png" alt="logotyp" />
          <span>Sociala</span><span>Spel</span>
        </Link>

        {authenticated && (
          <button id="menu-button" onClick={() => _toggleMenu()}>
            <SVG src="/images/settings.svg" />
          </button>
        )}

        {authenticated && (
          <div className="menu">
            {gameName && (
              <div className="menu-item">
                <SVG src="/images/menu_game.svg" />
                <div>
                  <span className="label">{gameName}</span>
                  <button className="value invisible" onClick={() => _changeGame()}>Byt spel</button>
                </div>
              </div>
            )}

            <div className="menu-item">
              <SVG src="/images/menu_video.svg" />
              <div>
                <span className="label">{sharedState.game.video ? 'Med video' : 'Utan video'}</span>
                <button className="invisible" onClick={() => _toggleVideo()}>
                  {sharedState.game.video ? 'Spela utan video' : 'Spela med video'}
                </button>
              </div>
            </div>

            <div className="menu-item">
              <SVG src="/images/menu_players.svg" />
              <div>
                <span className="label">{sharedState.users.length} spelare</span>
                <div>
                {sharedState.users.map((user, i, arr) => (
                  <span key={user.userId}>{`${arr.length - 1 === i ? user.userName : user.userName + ', '}`}</span>
                ))}
                </div>
              </div>
            </div>

            <div className="menu-item">
              <SVG src="/images/menu_room.svg" />
              <div>
                <span className="label">{user.gameCode}</span>
                <button className="invisible" onClick={() => logout()}>Lämna spelrummet</button>
              </div>
            </div>

          </div>
        )}


      </div>

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
