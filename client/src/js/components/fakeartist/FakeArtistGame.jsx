import React from 'react'
import FakeArtistGameWaiting from './FakeArtistGameWaiting'
import FakeArtistGamePlay from './FakeArtistGamePlay'
import FakeArtistPlayers from './FakeArtistPlayers'

class FakeArtistGame extends React.Component {

  constructor(props) {
    super(props);
    const code = this.props.game.game.code;
    console.log(API_URL);
    //console.log(process.env);
    //const url = process.env.API_URI;
    const url = API_URL;
    this.socket = new WebSocket(url);
  }

  componentDidMount() {

    const userId = this.props.userId;
    const gameCode = this.props.game.game.code;

    // This happens when the socket is opening, ie when you enter the game area
    this.socket.addEventListener('open', function(event) {
      this.send(JSON.stringify({type: 'opening', gameCode: gameCode, userId: userId}));
    })

    // This happens when anyone else enters the game area, or when the game start/stops
    const self = this;
    this.socket.addEventListener('message', function(event) {
      console.log('Incoming data!')
      const data = JSON.parse(event.data);
      console.log(data);
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
    // Close the webSocket
    this.socket.close();
    // Reset game
    this.props.fa_resetGame();
  }

  render() {

    const { game, fa_leaveGame, userId, userName } = this.props;

console.log('här:');
console.log(API_URL);

    return (
      <div className="game fakeartist">
        <div className="container">
          <div className="currentUser">{userName}</div>

          url: {API_URL}


          {game.game.state === 'waiting' && <FakeArtistGameWaiting code={game.game.code} />}

          {game.game.state === 'play' && <FakeArtistGamePlay userId={userId} game={game} />}

          <FakeArtistPlayers game={game} />

          {game.game.state === 'waiting' && <div className="startGame button" onClick={() => this._startGame()}>Starta spelet</div>}



          {game.game.state === 'waiting' &&
            <div><div className="leaveGame extrabutton" onClick={() => fa_leaveGame()}>Lämna spelet</div></div>
          }

          {game.game.state === 'play' && <div className="exitGame button" onClick={() => this._stopGame()}>Avsluta omgången</div>}

        </div>
      </div>
    )

  }
}

export default FakeArtistGame;
