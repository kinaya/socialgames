import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { startGame, changeGame } from '../../actions/gameActions'
import SVG from 'react-inlinesvg';
import GetStarted from '../GetStarted'

const AboutWerewolf = ({authenticated, startGame, changeGame}) => {
  const [rulesOpen, setRulesOpen] = useState('closed')

  useEffect(() => {
    if(!authenticated) {
      setRulesOpen('open')
    }
  }, [])

  return (
    <div className="container">
      <h1>Varulvspelet</h1>

      <p className="preamble">Diskussionsspel där spelarna genom att bluffa, läsa av varandra och finna motsägelser i uttalanden ska lyckas avgöra vilka i sällskapet som har blivit tilldelade varulvsroller!</p>

      <div className={`rules ${rulesOpen}`}>
        <div className="rules-inner">
          <h2>Regler</h2>
          <h3><span>1</span>Rollerna slumpas</h3>
          <p>Rollerna slumpas och alla spelare får tid att läsa sin roll</p>
          <h3><span>2</span>Det blir natt</h3>
          <p>Det blir natt. Under natten vaknar olika roller för att t.ex smygtitta på andra spelares kort</p>
          <h3><span>3</span>Det blir morgon</h3>
          <p>Det blir morgon. Nu gäller det att lista ut vilka som är varulvar! Man får fråga och säga vad som helt, vägra att svara eller ljuga så mycket man vill</p>
          <h3><span>4</span>Peka ut varulvarna</h3>
          <p>När tiden är ute röstar alla på vem de tror är varulv. Kommer ni peka ut rätt, eller en oskyldig?</p>
        </div>
        <button id="rules-button" className="invisible" onClick={() => setRulesOpen(rulesOpen == 'closed' ? 'open' : 'closed')}>
          <div>{rulesOpen == 'closed' ? 'Visa regler' : 'Dölj regler'}</div><SVG src="/images/open_close.svg" />
        </button>
      </div>

      {!authenticated && (
        <GetStarted gameName="Varulvspelet"/>
      )}

      {authenticated && (
        <div className="buttons">
          <button onClick={() => startGame('werewolf')}>Starta spelet</button>
          <button className="gray" onClick={() => changeGame(null)}>Byt spel</button>
        </div>
      )}

    </div>
  )
}

const mapStateToProps = state => {
  return {
    authenticated: state.localState.user.authenticated
  }
}

export default connect(
  mapStateToProps,
  {startGame, changeGame}
)(AboutWerewolf)
