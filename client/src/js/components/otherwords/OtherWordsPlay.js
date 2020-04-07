import React from 'react'

const OtherWordsPlay = ({settings, score, time, currentword, changeWord, skipWord, finishRound}) => {

  return (
    <div className="ui text container center aligned">

      <div className="ui two column grid">
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

      <button className="ui primary button large" onClick={changeWord} >Nästa ord</button>

      <div>
        <button className="ui button" onClick={skipWord} >Hoppa över ord</button>
        <button className="ui button" onClick={finishRound}>Avsluta omgången</button>
      </div>

    </div>
  )
}


export default OtherWordsPlay;
