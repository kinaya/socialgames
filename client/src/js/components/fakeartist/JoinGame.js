import React from 'react'
import FakeArtistIntro from './FakeArtistIntro'
import JoinGameForm from './JoinGameForm'

const JoinGame = () => {
  return (
    <div className="ui text container">

      <h1 className="heading">Gå med i ett spel</h1>

      <JoinGameForm />

    </div>

  )
}

export default JoinGame;
