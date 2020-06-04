import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import SVG from 'react-inlinesvg';
import GetStarted from '../GetStarted'

const AboutOtherWords = ({authenticated}) => {
  const [rulesOpen, setRulesOpen] = useState('closed')

  useEffect(() => {
    if(!authenticated) {
      setRulesOpen('open')
    }
  }, [])

  return (
    <div className="container">
      <h1>Med andra ord</h1>
      <p className="preamble">Ett familje- och partyspel som går ut på att du ska säga samma sak, med andra ord, under tidspress. Gör det svårare genom att ha med förbjudna ord som inte får användas i din förklaring!</p>

      <div className={`rules ${rulesOpen}`}>
        <div className="rules-inner">
          <h2>Regler</h2>
          <h3><span>1</span>Bestäm hur ni vill spela</h3>
          <p>Vill ni ha med förbjudna ord, och hur lång tid vill ni ha på er?</p>
          <h3><span>2</span>Välj vem som förklarar</h3>
          <p>Den som förklarar klickar på "Starta spelet" på sin skärm. Övriga deltagare gör inget</p>
          <h3><span>3</span>Förklara och gissa</h3>
          <p>Nu gäller det att förklara ordet på skärmen, utan att råka säga eventuella förbjudna ord. När de som gissar gissar rätt slumpas ett nytt ord fram</p>
          <h3><span>4</span>Byt förklarare</h3>
          <p>Skriv upp poängen och byt vem som förklara.</p>
        </div>
        <button id="rules-button" className="invisible" onClick={() => setRulesOpen(rulesOpen == 'closed' ? 'open' : 'closed')}>
          <div>{rulesOpen == 'closed' ? 'Visa regler' : 'Dölj regler'}</div><SVG src="/images/open_close.svg" />
        </button>
      </div>

      {!authenticated && (
        <GetStarted gameName="Med andra ord" />
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
  mapStateToProps
)(AboutOtherWords)
