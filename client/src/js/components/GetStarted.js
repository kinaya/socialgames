import React from 'react'
import { Link } from 'react-router-dom'

const GetStarted = ({gameName}) => {

  return (
    <div className="createRoomAd">
      <h2>Spela {gameName}</h2>
      <p>För att spela {gameName} behöver du skapa eller gå med i ett spelrum. Det är gratis, ingen inloggning behövs och du kan spela alla spel så mycket du vill.</p>
      <div className="buttons">
        <Link to='/newgame' className="button" role="button">
          Skapa nytt spelrum
        </Link>
        <Link to='/joingame' className="button" role="button">
          Gå med i spelrum
        </Link>
      </div>
    </div>
  )

}

export default GetStarted
