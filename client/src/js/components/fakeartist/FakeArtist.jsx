import React from 'react'
import FakeArtistIntro from './FakeArtistIntro'
import JoinGame from './JoinGame'
import CreateGame from './CreateGame'

class FakeArtist extends React.Component {

  componentWillUnmount() {
    this.props.fa_setGameState('intro');
  }

  render() {

    const { gamestate, fa_joinGame, fa_createGame, fa_setGameState } = this.props;

    return (
      <div className="game fakeartist">
        <div className="container">
          {gamestate === 'intro' && <FakeArtistIntro fa_setGameState={fa_setGameState} />}
          {gamestate === 'create' && <CreateGame fa_createGame={fa_createGame} />}
          {gamestate === 'join' && <JoinGame fa_joinGame={fa_joinGame} />}
        </div>
      </div>
    )

  }
}

export default FakeArtist;
