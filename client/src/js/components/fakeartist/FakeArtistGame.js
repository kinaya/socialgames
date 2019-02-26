import React from 'react'
import FakeArtistGameWaiting from './FakeArtistGameWaiting'
import FakeArtistGamePlay from './FakeArtistGamePlay'
import FakeArtistPlayers from './FakeArtistPlayers'
import { connect } from 'react-redux'
import { fa_updateUsers, fa_updateUser, fa_setGameState, fa_updateGame, fa_updateWord, fa_resetGame } from '../../actions'
import { Link } from 'react-router-dom'
import JoinGameForm from './JoinGameForm'

class FakeArtistGame extends React.Component {

  constructor(props) {
    super(props);
    this.socket = new WebSocket(API_URL);
  }

  componentDidMount() {

    const userId = this.props.userId;
    const gameCode = sessionStorage.getItem('gameCode')
    const userName = sessionStorage.getItem('userName')

    // This happens when the socket is opening, ie when you enter the game area
    // Send gameCode and userName to server to save user, and get game and users in return
    this.socket.addEventListener('open', function(event) {
      this.send(JSON.stringify({type: 'opening', gameCode: gameCode, userName: userName}))
    })

    // This happens when a message is sent from the server. It can be when a user
    // enters or leaves the game, or when the game starts or stops
    const self = this;
    this.socket.addEventListener('message', function(event) {
      const data = JSON.parse(event.data);
      if(data.game) {self.props.fa_updateGame(data.game);}
      if(data.users) {self.props.fa_updateUsers(data.users);}
      if(data.word) {self.props.fa_updateWord(data.word);}
      if(data.user) {self.props.fa_updateUser(data.user);}
    })

  }

  _startGame() {
    this.socket.send(JSON.stringify({type: 'startGame', gameCode: this.props.game.code}))
  }

  _stopGame() {
    this.socket.send(JSON.stringify({type: 'stopGame', gameCode: this.props.game.code}))
  }

  // This happens when the user navigates inside React, but not on manual navigation/refresh
  // TODO: Do I need to run socket.close() or does it close automatically when component unmounts?
  componentWillUnmount() {
    this.props.fa_resetGame();
    this.socket.close();
  }

  render() {

    const { game, users, word } = this.props;

    const userId = sessionStorage.getItem('userId')
    const userName = sessionStorage.getItem('userName')

    return (
      <div className="ui text container center aligned">
        <div>{userName}</div>

        {game.state === 'waiting' && <FakeArtistGameWaiting code={game.code} />}

        {game.state === 'play' && <FakeArtistGamePlay userId={userId} users={users} word={word} />}

        <FakeArtistPlayers users={users} />

        {game.state === 'waiting' && <button className="ui primary large button" onClick={() => this._startGame()}>Starta spelet</button>}

        {game.state === 'waiting' && <div><Link className="ui basic button" to='/fake-artist'>Lämna spelet</Link></div>}

        {game.state === 'play' && <button className="ui basic button" onClick={() => this._stopGame()}>Avsluta omgången</button>}

      </div>
    )

  }
}

const mapStateToProps = state => {
  return {
    game: state.fakeartist.game,
    users: state.fakeartist.users,
    word: state.fakeartist.word
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fa_resetGame: () => dispatch(fa_resetGame()),
    fa_updateUsers: (users) => dispatch(fa_updateUsers(users)),
    fa_updateGame: (game) => dispatch(fa_updateGame(game)),
    fa_updateWord: (word) => dispatch(fa_updateWord(word)),
    fa_updateUser: (user) => dispatch(fa_updateUser(user)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FakeArtistGame)
