import React from 'react'

const OtherWordsFinished = ({score, setGameState, newRound, resetGame}) => {

  return (
    <div className="finished">

        <h1>{score} poäng</h1>

        <div className="newRound button" onClick={() => newRound()} >Ny omgång</div>
        <div>
          <div className="resetGame extrabutton" onClick={() => resetGame()} >Starta om spelet</div>
        </div>

    </div>
  )
}

export default OtherWordsFinished;