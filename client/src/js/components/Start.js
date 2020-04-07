import React from 'react'
import { Link } from 'react-router-dom'
import ReactSVG from 'react-svg';

const Start = () => {
  return (
    <div className="start">
      <div className="ui text container center aligned intro">
        <h1 className="ui header">Sociala spel</h1>
        <p>Alla de bästa sociala spelen. Spela roligare tillsammans!</p>

      <Link to='/newgame' className="ui large primary button" role="button">
        Skapa nytt spelrum
      </Link>
      <Link to='/joingame' className="ui large primary button" role="button">
        Gå med i spelrum
      </Link>
      </div>
    </div>
  )
}

export default Start;
