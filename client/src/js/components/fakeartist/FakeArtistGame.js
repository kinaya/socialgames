import React from 'react'
import FakeArtistGameWaiting from './FakeArtistGameWaiting'
import FakeArtistGamePlay from './FakeArtistGamePlay'
import FakeArtistPlayers from './FakeArtistPlayers'
import { connect } from 'react-redux'
import { fa_updateUsers, fa_setGameState, fa_updateGame, fa_updateWord, fa_resetGame } from '../../actions'
import { Link } from 'react-router-dom'

class FakeArtistGame extends React.Component {

  constructor(props) {
    super(props);
    this.socket = new WebSocket(API_URL);
  }

  componentDidMount() {

    const userId = this.props.userId;
    const gameCode = this.props.game.game.code;
    const userName = this.props.userName;

    // This happens when the socket is opening, ie when you enter the game area
    this.socket.addEventListener('open', function(event) {
      this.send(JSON.stringify({type: 'opening', gameCode: gameCode, userId: userId, userName: userName}));
    })

    // This happens when anyone else enters the game area, or when the game start/stops
    const self = this;
    this.socket.addEventListener('message', function(event) {
      const data = JSON.parse(event.data);
      if(data.users) {self.props.fa_updateUsers(data.users);}
      if(data.game) {self.props.fa_updateGame(data.game);}
      if(data.word) {self.props.fa_updateWord(data.word);}
    })

  }

  _startGame() {
    this.socket.send(JSON.stringify({type: 'startGame', gameCode: this.props.game.game.code}))
  }

  _stopGame() {
    this.socket.send(JSON.stringify({type: 'stopGame', gameCode: this.props.game.game.code}))
  }

  componentWillUnmount() {
    this.props.fa_resetGame();
    this.socket.close();
  }

  render() {

    const { game, fa_resetGame, userId, userName } = this.props;

    return (
      <div className="game fakeartist">
        <div className="container">
          <div className="currentUser">{userName}</div>
          {game.game.state === 'waiting' && <FakeArtistGameWaiting code={game.game.code} />}

          {game.game.state === 'play' && <FakeArtistGamePlay userId={userId} game={game} />}

          <FakeArtistPlayers game={game} />

          {game.game.state === 'waiting' && <div className="startGame button" onClick={() => this._startGame()}>Starta spelet</div>}

          {game.game.state === 'waiting' &&
            <div><Link className="leaveGame extrabutton" to='/fake-artist'>Leave game</Link></div>
          }

          {game.game.state === 'play' && <div className="exitGame button" onClick={() => this._stopGame()}>Avsluta omgången</div>}

        </div>
      </div>
    )

  }
}

const mapStateToProps = state => {
  return {
    game: state.fakeartist.game,
    userId: sessionStorage.getItem('userId'),
    userName: sessionStorage.getItem('userName')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fa_resetGame: () => dispatch(fa_resetGame()),
    fa_updateUsers: (users) => dispatch(fa_updateUsers(users)),
    fa_updateGame: (game) => dispatch(fa_updateGame(game)),
    fa_updateWord: (word) => dispatch(fa_updateWord(word))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FakeArtistGame)
