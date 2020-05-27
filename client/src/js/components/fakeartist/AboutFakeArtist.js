import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const AboutFakeArtist = ({authenticated}) => {

  return (
    <div className="container">
      <h1>Fake artist</h1>
      <p>Alla får ett motiv att rita tillsammans, där ni turas om att dra varsitt streck i samma teckning. Men en av er är the Fake Artist och vet inte vad ni ritar! Kommer ni avslöja vem som är the Fake Artist innan hen hinner lista ut vad ert konstverk föreställer?</p>

      {!authenticated && (
        <div className="buttons">
          <Link to='/newgame' className="button" role="button">
            Skapa nytt spelrum
          </Link>
          <Link to='/joingame' className="button" role="button">
            Gå med i spelrum
          </Link>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    authenticated: state.user.authenticated,
  }
}

export default connect(
  mapStateToProps,
  null
)(AboutFakeArtist)
