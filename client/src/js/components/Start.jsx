import React from 'react'
import { Link } from 'react-router-dom'
import ReactSVG from 'react-svg';

class Start extends React.Component {

  render() {

    return (
      <div className="start">
        <div className="intro">
          <h1>Social games</h1>
          <p>Alla de bästa sociala spelen. Spela lättare tillsammans!</p>
        </div>
        <div className="games">
          <Link to='/other-words'>
            <div className="inner">
              <ReactSVG src="./otherwords_logo.svg" />
              <h2>Med andra ord</h2>
              <p>Gissa ordet</p>
            </div>
          </Link>
          <Link to='/pictionary'>
            <div className="inner">
              <ReactSVG src='./pictionary_logo.svg' />
              <h2>Pictionary</h2>
              <p>Rita bäst</p>
            </div>
          </Link>
          <Link to='/fake-artist'>
            <div className="inner">
              <ReactSVG src='./fakeartist_logo.svg' />
              <h2>Fake artist</h2>
              <p>Vem luras?</p>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default Start;
