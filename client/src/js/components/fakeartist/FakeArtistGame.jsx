import React from 'react'
import FakeArtistGameWaiting from './FakeArtistGameWaiting'
import FakeArtistGamePlay from './FakeArtistGamePlay'
import FakeArtistPlayers from './FakeArtistPlayers'

class FakeArtistGame extends React.Component {

  constructor(props) {
    super(props);
    this.eventSource = new EventSource('/fake-artist/events');
  }

  componentDidMount() {

    // Listen for Start stop game for this game
    const gameIdOne = JSON.stringify(this.props.game.game._id) + 'startStopGame'
    this.eventSource.addEventListener(gameIdOne, e => {
      this.props.fa_sse_startStopGame(JSON.parse(e.data))
    })
    // Listen for added or removed users for this game
    const gameIdTwo = JSON.stringify(this.props.game.game._id) + 'addRemoveUser'
    this.eventSource.addEventListener(gameIdTwo, e => {
      this.props.fa_sse_addRemoveUser(JSON.parse(e.data).users)
    })

  }

  componentWillUnmount() {
    // Close the stream connection
    this.eventSource.close();
    // Reset game
    this.props.fa_resetGame();
  }

  render() {

    const { game, fa_startStopGame, fa_addRemoveUser, userId, userName } = this.props;

    return (
      <div className="game fakeartist">
        <div className="container">
          <div className="currentUser">{userName}</div>

          {game.game.state === 'waiting' && <FakeArtistGameWaiting code={game.game.code} />}

          {game.game.state === 'play' && <FakeArtistGamePlay userId={userId} game={game} />}

          <FakeArtistPlayers game={game} />

          {game.game.state === 'waiting' && <div className="startGame button" onClick={() => fa_startStopGame('start', game.game)}>Starta spelet</div>}

          {game.game.state === 'waiting' &&
            <div><div className="leaveGame extrabutton" onClick={() => fa_addRemoveUser('remove', game.game.code, userName, userId)}>Lämna spelet</div></div>
          }

          {game.game.state === 'play' && <div className="exitGame button" onClick={() => fa_startStopGame('stop', game.game)}>Avsluta omgången</div>}

        </div>
      </div>
    )

  }
}

export default FakeArtistGame;
