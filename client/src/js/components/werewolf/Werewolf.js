import React, { useEffect } from 'react'
import io from "socket.io-client";
import { connect } from 'react-redux'
import WerewolfPlay from './WerewolfPlay'
import WerewolfCharacter from './WerewolfCharacter'
import { startGame, resetGames } from '../../actions/gameActions'
import { toast } from 'react-toastify';

import characters from './werewolf.json'

const Werewolf = ({werewolf, startGame, resetGames}) => {

  return (
    <div className="">
      <h1>Varulvspelet</h1>

      {!werewolf.running && (
        <>
        <p>Text om varulvspelet. Alla får ett motiv att rita tillsammans, där ni turas om att dra varsitt streck i samma teckning. Men en av er är the Fake Artist och vet inte vad ni ritar! Kommer ni avslöja vem som är the Fake Artist innan hen hinner lista ut vad ert konstverk föreställer?</p>
        <div className="ui info message">
          <h3>Fler spelare behövs</h3>
          <p>Det behövs minst 5 spelare för att spela fake varulvspelet.</p>
        </div>
        </>
      )}

      {!werewolf.running && (
        <div>
          <h2>Karaktärer</h2>
          <p>Eftersom ni är 6st spelare kommer följande karaktärer att användas.</p>
          <div className="ui three stackable cards">
            {characters.map((character, i) => (
              <WerewolfCharacter key={i} display={true} character={character} />
            ))}
          </div>
        </div>
      )}

      {werewolf.running && <WerewolfPlay />}

      {!werewolf.running && <button className="ui primary large button" onClick={() => startGame('werewolf')}>Starta spelet</button>}

      {werewolf.running && <button className="ui basic button" onClick={() => resetGames()}>Avsluta omgången</button>}

    </div>
  )

}

const mapStateToProps = state => {
  return {
    werewolf: state.game.game.werewolf
  }
}

export default connect(
  mapStateToProps,
  {resetGames, startGame}
)(Werewolf)