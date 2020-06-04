import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import SVG from 'react-inlinesvg';
import GetStarted from '../GetStarted'

const AboutFakeArtist = ({authenticated}) => {
  const [rulesOpen, setRulesOpen] = useState('closed')

  useEffect(() => {
    if(!authenticated) {
      setRulesOpen('open')
    }
  }, [])

  return (
    <div className="container">
      <h1>Fake artist</h1>
      <p className="preamble">Alla får ett motiv att rita tillsammans, där ni turas om att dra varsitt streck i samma teckning. Men en av er är the Fake Artist och vet inte vad ni ritar! Kommer ni avslöja vem som är the Fake Artist innan hen hinner lista ut vad ert konstverk föreställer?</p>

      <div className={`rules ${rulesOpen}`}>
        <div className="rules-inner">
          <h2>Regler</h2>
          <h3><span>1</span>En av er slumpas som Fake artist</h3>
          <p>Den som är fake artist får bara veta vilken kategori ordet ni ska rita tillhör. Övriga spelare får veta både kategori och själva ordet som ska ritas.</p>
          <h3><span>2</span>Turas om att rita</h3>
          <p>Rita i tur och ordning till detaljer i en gemensam ritning av ordet. Den som är fake artist vet inte vad ni ritar utan måste gissa och låtsas att hen vet vad ni ritar.</p>
          <h3><span>3</span>Gissa vem som är Fake artist</h3>
          <p>När tiden är ute gissar ni vem som är fake artist. Den som blir utpekad kan rädda sig genom att gissa rätt i vad det är ni har ritat</p>
        </div>
        <button id="rules-button" className="invisible" onClick={() => setRulesOpen(rulesOpen == 'closed' ? 'open' : 'closed')}>
          <div>{rulesOpen == 'closed' ? 'Visa regler' : 'Dölj regler'}</div><SVG src="/images/open_close.svg" />
        </button>
      </div>

      {!authenticated && (
        <GetStarted gameName="Fake artist" />
      )}

    </div>
  )
}

const mapStateToProps = state => {
  return {
    authenticated: state.localState.user.authenticated,
  }
}

export default connect(
  mapStateToProps,
  null
)(AboutFakeArtist)
