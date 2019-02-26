import React from 'react'
import FakeArtistGame from './FakeArtistGame'
import JoinGameForm from './JoinGameForm'
import { connect } from 'react-redux'

const FakeArtistGameArea = ({match}) => {

  const userName = sessionStorage.getItem('userName')

  return (
    <div className="game fakeartist">
      <div className="container">

        {userName && <FakeArtistGame />}

        {!userName && (
          <div>
            <div className="intro">
              <h1>Gå med i ett spel</h1>
            </div>
            <JoinGameForm initialValues={{code: match.params.id}} />
          </div>
        )}

      </div>
    </div>
  )

}

export default FakeArtistGameArea;

/*const mapStateToProps = state => {
  return {
    game: state.fakeartist.game
  }
}*/

/*export default connect(
  mapStateToProps,
  null
)(FakeArtistGameArea)*/
