import React from 'react'

const OtherWordsFinished = ({score, setGameState, newRound, resetGame}) => {

  return (
    <div className="ui text container center aligned">

        <h1 className="ui heading">{score} poäng</h1>

        <button className="ui primary button" onClick={() => newRound()} >Ny omgång</button>
        <button className="ui button" onClick={() => resetGame()} >Starta om spelet</button>

    </div>
  )
}

export default OtherWordsFinished;
