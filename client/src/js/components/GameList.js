import React from 'react'
import { Link } from 'react-router-dom'

const GameList = ({gameCode}) => {

  return (
    <div className="ui three stackable cards">

      <Link to={{pathname: `${gameCode}/other-words`}} className="ui card" >
        <div className="image">
          <img src="https://semantic-ui.com/examples/assets/images/wireframe/image.png" />
        </div>
        <div className="content">
          <div className="header">Med andra ord</div>
          <div className="description">Gissa ordet</div>
        </div>
      </Link>

      <Link to={{pathname: `${gameCode}/pictionary`}} className="ui card" >
        <div className="image">
          <img src="https://semantic-ui.com/examples/assets/images/wireframe/image.png" />
        </div>
        <div className="content">
          <div className="header">Pictionary</div>
          <div className="description">Rita bäst</div>
        </div>
      </Link>

      <Link to={{pathname: `${gameCode}/fake-artist`}} className="ui card" >
        <div className="image">
          <img src="https://semantic-ui.com/examples/assets/images/wireframe/image.png" />
        </div>
        <div className="content">
          <div className="header">Fake artist</div>
          <div className="description">Vem luras?</div>
        </div>
      </Link>

      <Link to={{pathname: `${gameCode}/spyfall`}} className="ui card" >
        <div className="image">
          <img src="https://semantic-ui.com/examples/assets/images/wireframe/image.png" />
        </div>
        <div className="content">
          <div className="header">Spyfall</div>
          <div className="description">Vem luras?</div>
        </div>
      </Link>

    </div>
  )
}

export default GameList;
