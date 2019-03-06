import React from 'react'
import io from "socket.io-client";
import { connect } from 'react-redux'
import {spyfall_updateGame, spyfall_updateUsers, spyfall_resetGame } from '../../actions'
import { Link } from 'react-router-dom'
import SpyfallPlayers from './SpyfallPlayers'

class Spyfall extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    const userName = sessionStorage.getItem('userName')
    const userId = sessionStorage.getItem('userId')
    const gameCode = sessionStorage.getItem('gameCode')

    this.socket = io(`${BASE_URL}/spyfall`, {query: {userName, userId, gameCode}})

    this.socket.on('spyfall', (data) => {
      if(data.game) {
        this.props.spyfall_updateGame(data.game)
      }
      if(data.users) {
        this.props.spyfall_updateUsers(data.users)
      }
    })

  }

  componentWillUnmount() {
    this.props.spyfall_resetGame();
    this.socket.close();
  }

  _startGame() {
    this.socket.emit('startGame', this.props.game.code)
  }

  render() {

    const { game, users } = this.props
    const userId = sessionStorage.getItem('userId')

    return (
      <div className="">
        <h1>Spyfall</h1>
        {!game.spyfall_running && (
          <div className="ui info message">
            <h2>Väntar på spelare</h2>
            <div className="code"><span>Spelkod:</span> {game.code}</div>
            <div className="link"><span>Link:</span> https://socialgamesapp.herokuapp.com/fake-artist/{game.code}</div>
          </div>
        )}

        {!game.spyfall_running && (
          <SpyfallPlayers users={users} />
        )}

        {!game.spyfall_running && <div><Link className="ui basic button" to={{pathname: `/${game.code}`}}>Lämna spelet</Link></div>}

      </div>
    )

  }
}

const mapStateToProps = state => {
  return {
    game: state.spyfall.game,
    users: state.spyfall.users
  }
}

export default connect(
  mapStateToProps,
  {spyfall_updateGame, spyfall_updateUsers, spyfall_resetGame}
)(Spyfall)
