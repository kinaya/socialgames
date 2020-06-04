import React from 'react'
import { connect } from 'react-redux'
import OtherWordsPlay from './OtherWordsPlay'
import OtherWordsForm from './OtherWordsForm'
import AboutOtherWords from './AboutOtherWords'
import { resetGames, changeGame } from '../../actions/gameActions'
import { startGameLocal } from '../../actions/otherWordsActions'

const OtherWords = ({otherwords, startGameLocal, changeGame}) => {
  return (
    <>

      {otherwords.gamestate === 'intro' && (
        <AboutOtherWords />
      )}

      {otherwords.gamestate === 'intro' && (
        <div className="container">
          <OtherWordsForm startGameLocal={startGameLocal} />
        </div>
      )}

      {(otherwords.gamestate === 'play' || otherwords.gamestate === 'finished') && (
        <div className="container">
          <OtherWordsPlay />
        </div>
      )}

      {otherwords.gamestate === 'intro' && (
        <div className="container">
          <div className="buttons">
            <button onClick={() => startGameLocal()}>Starta spelet</button>
            <button className="gray" onClick={() => changeGame(null)}>Byt spel</button>
          </div>
        </div>
      )}

    </>
  )
}

const mapStateToProps = state => {
  return {
    otherwords: state.localState.otherwords
  }
}

export default connect(
  mapStateToProps,
  {startGameLocal, changeGame}
)(OtherWords)
