import React from 'react'
import { Link } from 'react-router-dom'
import GameList from './GameList'

const Start = () => {
  return (
    <div className="start">

      <div className="container full intro">
        <div className="container-inner">
        <h1>Riktigt roliga spel!</h1>
        <p>Hemsidan användas istället för spelbräde och kortlek. Och befinner ni er på olika platser kan ni spela via videolänk. De bästa sociala spelen var du än befinner dig. Helt gratis &#10084;</p>

        <div className="buttons">
          <Link to='/newgame' className="button" role="button">
            Skapa nytt spelrum
          </Link>
          <Link to='/joingame' className="button" role="button">
            Gå med i spelrum
          </Link>
        </div>
        </div>
      </div>

      <div className="container full getstarted">
        <div className="container-inner wide">
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

      <div className="container full featured-games">
        <div className="container-inner wide">
          <GameList />
        </div>
      </div>

    </div>
  )
}

export default Start;
