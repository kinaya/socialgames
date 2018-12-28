import React from 'react'

const OtherWordsFinished = ({score, setGameState, newRound, resetGame}) => {

  return (
    <div className="finished">

        <h1>{score} poäng</h1>

        <div className="newRound" onClick={() => newRound()} >Ny omgång</div>
        <div>
          <div className="resetGame" onClick={() => resetGame()} >Starta om spelet</div>
        </div>

    </div>
  )
}

export default OtherWordsFinished;
