import React, {useState} from 'react'
import { connect } from 'react-redux'
import { resetGames } from '../../actions/gameActions'
import FakeArtistPlay from './FakeArtistPlay'
import AboutFakeArtist from './AboutFakeArtist'
import ReactLoading from 'react-loading'

const FakeArtist = ({fakeArtist}) => {

  return (
    <div className="container-inner wide">

      {!fakeArtist.running && <AboutFakeArtist />}

      {fakeArtist.running && <FakeArtistPlay />}

      {fakeArtist.running && <button className="invisible" onClick={() => resetGames()}>Avsluta omgången</button>}

    </div>
  )

}


const mapStateToProps = state => {
  return {
    fakeArtist: state.game.game.fakeArtist,
  }
}

export default connect(
  mapStateToProps,
  {resetGames}
)(FakeArtist)
