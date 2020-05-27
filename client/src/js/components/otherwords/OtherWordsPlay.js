import React from 'react'

const OtherWordsPlay = ({settings, score, time, currentword, changeWord, skipWord, finishRound}) => {

  return (
    <div className="play-area">

      <div className="score">
        <div className="column">Poäng: {score}</div>
        {settings.timer != 0 &&
          <div className="column">Timer: {time}</div>
        }
      </div>

      <h1 className="word">{currentword.word}</h1>

      {settings.forbidden &&
        <div>
          {currentword.forbidden.map((word, i) => { return (
            <div key={i}>{word}</div>
          )})}
        </div>
      }

      <button onClick={changeWord} >Nästa ord</button>

      <div>
        <button className="gray" onClick={skipWord} >Hoppa över ord</button>
        <button className="invisible" onClick={finishRound}>Avsluta omgången</button>
      </div>

    </div>
  )
}


export default OtherWordsPlay;
