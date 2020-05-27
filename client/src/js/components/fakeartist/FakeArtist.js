import React, {useState} from 'react'
import { connect } from 'react-redux'
//import { fakeArtist_updateGame, fakeArtist_updateUsers, fakeArtist_resetGame } from '../../actions'
import { startGame, resetGames } from '../../actions/gameActions'
import FakeArtistPlay from './FakeArtistPlay'
import AboutFakeArtist from './AboutFakeArtist'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading'

const FakeArtist = ({fakeArtist, users, user, startGame, fakeArtistStart, resetGames}) => {

  return (
    <div className="container-inner">

      {!fakeArtist.running && (
        <AboutFakeArtist />
      )}

      {fakeArtist.running && <FakeArtistPlay user={user} fakeArtist={fakeArtist.fakeArtist} category={fakeArtist.category} word={fakeArtist.word} />}

      {fakeArtist.running && <button className="invisible" onClick={() => resetGames()}>Avsluta omgången</button>}

    </div>
  )

}


const mapStateToProps = state => {
  return {
    fakeArtist: state.game.game.fakeArtist,
    users: state.game.users,
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  {startGame, resetGames}
)(FakeArtist)
