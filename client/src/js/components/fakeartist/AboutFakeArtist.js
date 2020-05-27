import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startGame, changeGame } from '../../actions/gameActions'

const AboutFakeArtist = ({authenticated, startGame, changeGame}) => {

  return (
    <div className="container">
      <h1>Fake artist</h1>
      <p className="preamble">Alla får ett motiv att rita tillsammans, där ni turas om att dra varsitt streck i samma teckning. Men en av er är the Fake Artist och vet inte vad ni ritar! Kommer ni avslöja vem som är the Fake Artist innan hen hinner lista ut vad ert konstverk föreställer?</p>
      <div className="rules">
        <h3><span>1</span>En av er slumpas som Fake artist</h3>
        <p>Den som är fake artist får bara veta vilken kategori ordet ni ska rita tillhör. Övriga spelare får veta både kategori och själva ordet som ska ritas.</p>
        <h3><span>2</span>Turas om att rita</h3>
        <p>Rita i tur och ordning till detaljer i en gemensam ritning av ordet. Den som är fake artist vet inte vad ni ritar utan måste gissa och låtsas att hen vet vad ni ritar.</p>
        <h3><span>3</span>Gissa vem som är Fake artist</h3>
        <p>När tiden är ute gissar ni vem som är fake artist. Den som blir utpekad kan rädda sig genom att gissa rätt i vad det är ni har ritat</p>
      </div>

      {!authenticated && (
        <div className="buttons">
          <Link to='/newgame' className="button" role="button">
            Skapa nytt spelrum
          </Link>
          <Link to='/joingame' className="button" role="button">
            Gå med i spelrum
          </Link>
        </div>
      )}

      {authenticated && (
        <div className="buttons">
          <button onClick={() => startGame('fakeArtist')}>Starta spelet</button>
          <button className="gray" onClick={() => changeGame(null)}>Byt spel</button>
        </div>
      )}

    </div>
  )
}

const mapStateToProps = state => {
  return {
    authenticated: state.user.authenticated,
  }
}

export default connect(
  mapStateToProps,
  {startGame, changeGame}
)(AboutFakeArtist)
