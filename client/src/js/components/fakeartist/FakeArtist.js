import React from 'react'
import io from "socket.io-client";
import { connect } from 'react-redux'
import { fakeArtist_updateGame, fakeArtist_updateUsers, fakeArtist_resetGame } from '../../actions'
import FakeArtistPlayers from './FakeArtistPlayers'
import FakeArtistPlay from './FakeArtistPlay'
import { Link } from 'react-router-dom'

class FakeArtist extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    const userName = sessionStorage.getItem('userName')
    const userId = sessionStorage.getItem('userId')
    const gameCode = sessionStorage.getItem('gameCode')

    this.socket = io(`${BASE_URL}/fake-artist`, {query: {userName, userId, gameCode}})

    this.socket.on('fakeartist', (data) => {
      if(data.game) {
        this.props.fakeArtist_updateGame(data.game)
      }
      if(data.users) {
        this.props.fakeArtist_updateUsers(data.users)
      }
    })

  }

  // This happens when the user navigates inside React, but not on manual navigation/refresh
  componentWillUnmount() {
    this.props.fakeArtist_resetGame()
    this.socket.close();
  }

  _startGame() {
    this.socket.emit('startGame', this.props.game.code)
  }

  _stopGame() {
    this.socket.emit('stopGame', this.props.game.code)
  }

  render() {

    const { game, users } = this.props
    const userId = sessionStorage.getItem('userId')

    return (
      <div className="">
        <h1>The Fake artist</h1>
        {!game.fakeArtist_running && (
          <p>Alla får ett motiv att rita tillsammans, där ni turas om att dra varsitt streck i samma teckning. Men en av er är the Fake Artist och vet inte vad ni ritar! Kommer ni avslöja vem som är the Fake Artist innan hen hinner lista ut vad ert konstverk föreställer?</p>
        )}

        {!game.fakeArtist_running && (
          <div className="ui info message">
            <h2>Väntar på spelare</h2>
            <div className="code"><span>Spelkod:</span> {game.code}</div>
            <div className="link"><span>Link:</span> https://socialgamesapp.herokuapp.com/fake-artist/{game.code}</div>
          </div>
        )}

        {game.fakeArtist_running && <FakeArtistPlay userId={userId} users={users} word={game.fakeArtist_word} />}

        <FakeArtistPlayers users={users} />

        {!game.fakeArtist_running && <button className="ui primary large button" onClick={() => this._startGame()}>Starta spelet</button>}

        {!game.fakeArtist_running && <div><Link className="ui basic button" to={{pathname: `/${game.code}`}}>Lämna spelet</Link></div>}

        {game.fakeArtist_running && <button className="ui basic button" onClick={() => this._stopGame()}>Avsluta omgången</button>}


      </div>
    )

  }
}

const mapStateToProps = state => {
  return {
    game: state.fakeartist.game,
    users: state.fakeartist.users
  }
}

export default connect(
  mapStateToProps,
  {fakeArtist_updateGame, fakeArtist_updateUsers, fakeArtist_resetGame}
)(FakeArtist)
