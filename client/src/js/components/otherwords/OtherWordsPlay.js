import React from 'react'
import { connect } from 'react-redux'
import { changeWord, skipWord, finishRound, resetGame } from '../../actions/otherWordsActions'

const OtherWordsPlay = ({settings, gamestate, resetGame, score, time, currentword, changeWord, skipWord, finishRound}) => {

  return (
    <div className="play-area">

      {gamestate === 'play' && (
        <>

        <div className="score">
          <div className="column">Poäng: {score}</div>
          {settings.timer != 0 &&
            <div className="column">Timer: {time}</div>
          }
        </div>

        <div>
          <h1 className="word">{currentword.word}</h1>

          {settings.forbidden &&
            <div className="forbidden-words">
              {currentword.forbidden.map((word, i) => { return (
                <div key={i}>{word}</div>
              )})}
            </div>
          }

          <button className="change-word" onClick={changeWord} >Nästa ord</button>
          <button className="gray" onClick={skipWord} >Hoppa över ord</button>
        </div>

        </>
      )}

      {gamestate === 'finished' && (
        <h1>{score} poäng</h1>
      )}

      <div className="align-right">
        {gamestate === 'finished' && (
          <button className="invisible" onClick={resetGame}>Avsluta omgången</button>
        )}
        {(gamestate === 'play') && (
          <button className="invisible" onClick={() => finishRound()}>Stoppa omgången</button>
        )}
      </div>

    </div>
  )
}


const mapStateToProps = state => {
  return {
    settings: state.localState.otherwords.settings,
    score: state.localState.otherwords.score,
    time: state.localState.otherwords.time,
    currentword: state.localState.otherwords.currentword,
    gamestate: state.localState.otherwords.gamestate
  }
}

export default connect(
  mapStateToProps,
  {finishRound, changeWord, skipWord, resetGame}
)(OtherWordsPlay)
