import React from 'react'
import { connect } from 'react-redux'
import OtherWordsPlay from './OtherWordsPlay'
import OtherWordsForm from './OtherWordsForm'
import OtherWordsFinished from './OtherWordsFinished'
import AboutOtherWords from './AboutOtherWords'
import { resetGames, changeGame } from '../../actions/gameActions'
import { startGameLocal, changeWord, skipWord, finishRound, newRound, resetGame } from '../../actions/otherWordsActions'

const OtherWords = ({otherwords, startGameLocal, changeWord, skipWord, finishRound, newRound, resetGame, changeGame}) => {
  return (
    <div className="container-inner">

      {otherwords.gamestate === 'intro' && (
        <AboutOtherWords />
      )}

      {otherwords.gamestate === 'intro' && (
        <OtherWordsForm startGameLocal={startGameLocal}/>
      )}

      {otherwords.gamestate === 'play' && <OtherWordsPlay
        settings={otherwords.settings}
        score={otherwords.score}
        time={otherwords.time}
        currentword={otherwords.currentword}
        changeWord={changeWord}
        skipWord={skipWord}
        finishRound={finishRound}
       />}

      {otherwords.gamestate === 'finished' && <OtherWordsFinished newRound={newRound} resetGame={resetGame} score={otherwords.score} />}

      {otherwords.gamestate === 'intro' && (
        <div className="buttons">
          <button onClick={() => startGameLocal()}>Starta spelet</button>
          <button className="gray" onClick={() => changeGame(null)}>Byt spel</button>
        </div>
      )}

    </div>
  )
}

const mapStateToProps = state => {
  return {
    otherwords: state.otherwords
  }
}

export default connect(
  mapStateToProps,
  {startGameLocal, changeWord, skipWord, finishRound, newRound, resetGame, changeGame}
)(OtherWords)
