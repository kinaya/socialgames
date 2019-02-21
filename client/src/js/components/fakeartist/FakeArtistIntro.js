import React from 'react'
import { Link } from 'react-router-dom'

const FakeArtistIntro = () => {
  return (

    <div className="game fakeartist">
      <div className="container">
        <div className="intro">
          <h1>Fake artist</h1>
          <p>Alla får ett motiv att rita tillsammans, där ni turas om att dra varsitt streck i samma teckning. Men en av er är the Fake Artist och vet inte vad ni ritar! Kommer ni avslöja vem som är the Fake Artist innan hen hinner lista ut vad ert konstverk föreställer?</p>
        </div>

        <Link className="newGame button" to="/fake-artist/create">Create new game</Link>
        <Link className="joinGame button" to="/fake-artist/join">Join a game</Link>
      </div>
    </div>

  )
}

export default FakeArtistIntro
