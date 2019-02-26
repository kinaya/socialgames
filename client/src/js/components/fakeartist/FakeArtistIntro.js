import React from 'react'
import { Link } from 'react-router-dom'

const FakeArtistIntro = () => {
  return (

    <div className="ui container center aligned">
      <div className="ui text container">
        <h1>Fake artist</h1>
        <p>Alla får ett motiv att rita tillsammans, där ni turas om att dra varsitt streck i samma teckning. Men en av er är the Fake Artist och vet inte vad ni ritar! Kommer ni avslöja vem som är the Fake Artist innan hen hinner lista ut vad ert konstverk föreställer?</p>
      </div>

      <Link className="ui large primary button" to="/fake-artist/create">Starta nytt spel</Link>
      <Link className="ui large primary button" to="/fake-artist/join">Gå med i ett spel</Link>
    </div>

  )
}

export default FakeArtistIntro
