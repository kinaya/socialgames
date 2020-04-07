import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'
import { changeGame } from '../actions/gameActions'
import { connect } from 'react-redux';

const Header = ({logout, changeGame, game, user, authenticated}) => {

  let gameName = game.game.activeGame
  if(game.game.activeGame === 'werewolf') gameName = 'Varulvspelet'
  if(game.game.activeGame === 'fakeartist') gameName = 'Fake Artist'
  if(game.game.activeGame === 'otherwords') gameName = 'Med andra ord'
  if(game.game.activeGame === 'pictionary') gameName = 'Pictionary'
  if(game.game.activeGame === 'spyfall') gameName = 'Spyfall'

  return (
    <div className="site-header">
      <Link id="logo" to={authenticated ? {pathname: `/${user.gameCode}`} : '/'} >
        <span>Sociala</span><span>Spel</span>
      </Link>

      {authenticated && (
        <>
          {gameName && (
            <div>
              <div>{gameName}</div>
              <button className="ui inverted button" onClick={() => changeGame(null)}>Byt spel</button>
            </div>
          )}
          <div><span>Ditt Namn:</span>{user.userName}</div>
          <div><span>Spelkod:</span>{user.gameCode}</div>
          <div><span>Antal spelare:</span>{game.users.length}</div>
          <button className="ui inverted button" onClick={() => logout()}>Lämna spelet</button>
        </>
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
  { logout, changeGame }
)(Header)
