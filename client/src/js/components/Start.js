import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className="start">

      <div className="container intro">
        <h1>Sociala spel</h1>
        <p>Alla de bästa sociala spelen. Spela roligare tillsammans!</p>
        <Link to='/newgame' className="button" role="button">
          Skapa nytt spelrum
        </Link>
        <Link to='/joingame' className="button" role="button">
          Gå med i spelrum
        </Link>
      </div>

      <div className="container getstarted">
        <div>
          <img src={`images/Bybo.png`} />
          <h2>1. Skapa spelrum</h2>
          <p>Skapa ett nytt spelrum. Det är helt gratis och det krävs ingen inloggning.</p>
        </div>
        <div>
          <img src={`images/Joker.png`} />
          <h2>2. Bjud in vänner</h2>
          <p>Skicka koden och vänta tills dina vänner dyker upp</p>
        </div>
        <div>
          <img src={`images/Tjuv.png`} />
          <h2>3. Börja spela</h2>
          <p>Välj ett spel och börja spela</p>
        </div>
      </div>

    </div>
  )
}

export default Start;
