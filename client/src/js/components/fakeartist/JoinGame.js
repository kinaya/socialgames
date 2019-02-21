import React from 'react'
import FakeArtistIntro from './FakeArtistIntro'
import JoinGameForm from './JoinGameForm'

const JoinGame = () => {
  return (

    <div className="game fakeartist">
      <div className="container">

        <div className="intro">
          <h1>Gå med i ett spel</h1>
        </div>

        <JoinGameForm />

      </div>
    </div>

  )
}

export default JoinGame;
