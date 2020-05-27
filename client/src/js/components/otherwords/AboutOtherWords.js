import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const AboutOtherWords = ({authenticated}) => {

  return (
    <div className="container">
      <h1>Med andra ord</h1>
      <p>Ett familje- och partyspel som går ut på att du ska säga samma sak, med andra ord, under tidspress. Gör det svårare genom att ha med förbjudna ord som inte får användas i din förklaring!</p>

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
  mapStateToProps
)(AboutOtherWords)
