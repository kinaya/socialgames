import React, {useState} from 'react'
import { connect } from 'react-redux'
import { resetGames, startGame, changeGame } from '../../actions/gameActions'
import FakeArtistPlay from './FakeArtistPlay'
import FakeArtistForm from './FakeArtistForm'
import AboutFakeArtist from './AboutFakeArtist'
import ReactLoading from 'react-loading'

const FakeArtist = ({fakeArtist, resetGames, startGame, changeGame}) => {

  return (
    <>

      {!fakeArtist.running && (
        <AboutFakeArtist />
      )}

      {!fakeArtist.running && (
        <div className="container">
          <FakeArtistForm />
        </div>
      )}

      {!fakeArtist.running && (
        <div className="container">
          <div className="buttons">
            <button onClick={() => startGame('fakeArtist')}>Starta spelet</button>
            <button className="gray" onClick={() => changeGame(null)}>Byt spel</button>
          </div>
        </div>
      )}

      {fakeArtist.running && <FakeArtistPlay />}

      {fakeArtist.running && (
        <div className="container">
          <button className="invisible" onClick={() => resetGames()}>Avsluta omgången</button>
        </div>
      )}

    </>
  )

}

const mapStateToProps = state => {
  return {
    fakeArtist: state.sharedState.game.fakeArtist,
  }
}

export default connect(
  mapStateToProps,
  {resetGames, startGame, changeGame}
)(FakeArtist)
