import React from 'react'
import OtherWordsIntro from './OtherWordsIntro'
import OtherWordsPlay from './OtherWordsPlay'
import OtherWordsFinished from './OtherWordsFinished'

class OtherWords extends React.Component {

  componentWillUnmount() {
    this.props.resetGame();
  }

  render() {

    const {gamestate, time, currentword, settings, changeWord, skipWord, newRound, setGameState, score, stopTimer, resetGame, finishRound, startGame, changeSettings} = this.props;

    return (
      <div>
        {gamestate === 'intro' && <OtherWordsIntro settings={settings} startGame={startGame} changeSettings={changeSettings} setGameState={setGameState} />}
        {gamestate === 'play' && <OtherWordsPlay score={score} time={time} finishRound={finishRound} stopTimer={stopTimer} settings={settings} changeWord={changeWord} skipWord={skipWord} setGameState={setGameState} currentword={currentword} /> }
        {gamestate === 'finished' && <OtherWordsFinished newRound={newRound} resetGame={resetGame} score={score} setGameState={setGameState} />}
      </div>
    )

  }
}

export default OtherWords;
