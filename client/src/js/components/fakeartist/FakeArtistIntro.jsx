import React from 'react'

const FakeArtistIntro = ({fa_setGameState}) => {

  return (
    <div>
      <div className="intro">
        <h1>Fake artist</h1>
        <p>Alla får ett motiv att rita tillsammans, där ni turas om att dra varsitt streck i samma teckning. Men en av er är the Fake Artist och vet inte vad ni ritar! Kommer ni avslöja vem som är the Fake Artist innan hen hinner lista ut vad ert konstverk föreställer?</p>
      </div>

      <div className="newGame button" onClick={() => fa_setGameState('create')}>Starta nytt spel</div>
      <div className="joinGame button" onClick={() => fa_setGameState('join')}>Gå med i spel</div>

    </div>
  )
}

export default FakeArtistIntro;
