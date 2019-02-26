import React from 'react'
import { Link } from 'react-router-dom'
import ReactSVG from 'react-svg';

const Start = () => {
  return (
    <div className="start">
      <div className="ui text container center aligned intro">
        <h1 className="ui header">Sociala spel</h1>
        <p>Alla de bästa sociala spelen. Spela roligare tillsammans!</p>
      </div>

      <div className="ui three stackable cards">
        <Link to='/other-words' className="ui card">
          <div className="image">
            <ReactSVG src="./otherwords_logo.svg" />
            <img src="https://semantic-ui.com/examples/assets/images/wireframe/image.png" />
          </div>
          <div className="content">
            <div className="header">Med andra ord</div>
            <div className="description">Gissa ordet</div>
          </div>
        </Link>

        <Link to='/pictionary' className="ui card">
          <div className="image">
            <ReactSVG src='./pictionary_logo.svg' />
            <img src="https://semantic-ui.com/examples/assets/images/wireframe/image.png" />
          </div>
          <div className="content">
            <div className="header">Pictionary</div>
            <div className="description">Rita bäst</div>
          </div>
        </Link>

        <Link to='/fake-artist' className="ui card">
          <div className="image">
            <ReactSVG src='./fakeartist_logo.svg' />
            <img src="https://semantic-ui.com/examples/assets/images/wireframe/image.png" />
          </div>
          <div className="content">
            <div className="header">Fake artist</div>
            <div className="description">Vem luras?</div>
          </div>
        </Link>
      </div>
      <div className="ui three stackable cards">
        <Link to='/spyfall' className="ui card">
          <div className="image">
            <ReactSVG src='./fakeartist_logo.svg' />
            <img src="https://semantic-ui.com/examples/assets/images/wireframe/image.png" />
          </div>
          <div className="content">
            <div className="header">Spyfall</div>
            <div className="description">Vem luras?</div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Start;
