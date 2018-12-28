import React from 'react'

class OtherWordsPlay extends React.Component {

  render() {
    const {settings, score, time, currentword, changeWord, skipWord, finishRound} = this.props;

    return (
      <div>

        <div className="info">
          <div className="score">Poäng: {score}</div>
          {settings.timer != 0 &&
            <div className="time">Timer: {time}</div>
          }
        </div>

        <h1 className="word">{currentword.word}</h1>

        {settings.forbidden &&
          <div className="excluded">
            {currentword.forbidden.map((word, i) => { return (
              <div key={i}>{word}</div>
            )})}
          </div>
        }

        <div className="nextword" onClick={() => changeWord()} >Nästa ord</div>
        <div>
          <div className="skipword" onClick={() => skipWord()} >Hoppa över ord</div>
          <div className="finishRound" onClick={() => finishRound()}>Avsluta omgången</div>
        </div>

      </div>
    )
  }
}

export default OtherWordsPlay;
