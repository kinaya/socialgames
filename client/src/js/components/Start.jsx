import React from 'react'
import { Link } from 'react-router-dom'
import SVG from 'react-inlinesvg';

class Start extends React.Component {

  render() {

    return (
      <div className="start">
        <div className="intro">
          <h1>Social games</h1>
          <p>All your favourite social games. Play easier together!</p>
        </div>
        <div className="games">
          <Link to='/other-words'>
            <SVG src="../../../dist/otherwords_logo.svg"/>
            <h2>Med andra ord</h2>
            <p>Gissa order</p>
          </Link>
          <Link to='/pictionary'>
            <SVG src='../../../dist/pictionary_logo.svg' />
            <h2>Pictionary</h2>
            <p>Rita bäst</p>
          </Link>
          <Link to='/fake-artist'>
            <SVG src='../../../dist/fakeartist_logo.svg' />
            <h2>Fake artist</h2>
            <p>Vem fakear?</p>
          </Link>
        </div>
      </div>
    )
  }
}

export default Start;
