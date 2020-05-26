import React, {useState} from 'react'
import { connect } from 'react-redux'
//import { fakeArtist_updateGame, fakeArtist_updateUsers, fakeArtist_resetGame } from '../../actions'
import { startGame, resetGames } from '../../actions/gameActions'
import FakeArtistPlay from './FakeArtistPlay'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading'

const FakeArtist = ({fakeArtist, users, user, startGame, fakeArtistStart, resetGames}) => {

  return (
    <div className="">

      {!fakeArtist.running && users.length < 3 && (
        <div className="ui info message">
          <h3>Fler spelare behövs!</h3>
          <p>Det behövs minst 3 spelare för att spela Fake Artist.</p>
        </div>
      )}

      <h1>Fake Artist</h1>

      {!fakeArtist.running && (
        <p>Alla får ett motiv att rita tillsammans, där ni turas om att dra varsitt streck i samma teckning. Men en av er är the Fake Artist och vet inte vad ni ritar! Kommer ni avslöja vem som är the Fake Artist innan hen hinner lista ut vad ert konstverk föreställer?</p>
      )}

      {fakeArtist.running && <FakeArtistPlay user={user} fakeArtist={fakeArtist.fakeArtist} category={fakeArtist.category} word={fakeArtist.word} />}

      {!fakeArtist.running && <button className="ui primary large button" onClick={() => startGame('fakeArtist')}>Starta spelet</button>}

      {fakeArtist.running && <button className="ui basic button" onClick={() => resetGames()}>Avsluta omgången</button>}

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
