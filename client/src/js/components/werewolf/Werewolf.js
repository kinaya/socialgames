import React, { useEffect } from 'react'
import io from "socket.io-client";
import { connect } from 'react-redux'
import WerewolfPlay from './WerewolfPlay'
import WerewolfCharacter from './WerewolfCharacter'
import WerewolfSteps from './WerewolfSteps'
import { startGame, resetGames } from '../../actions/gameActions'
import { nextStep, displayCharacters } from '../../actions/werewolfActions'
import { toggleLocalVideo } from '../../actions/userActions'
import { toast } from 'react-toastify';

import characters from './werewolf.json'

const Werewolf = ({werewolf, startGame, resetGames, displayCharacters, userId, nextStep, toggleLocalVideo}) => {

  return (
    <div className="">
      <h1>Varulvspelet</h1>

      {werewolf.running && (
        <WerewolfSteps toggleLocalVideo={toggleLocalVideo} userId={userId} characters={werewolf.characters} step={werewolf.step} displayCharacters={displayCharacters} nextStep={nextStep}/>
      )}

      {!werewolf.running && (
        <p>Diskussionsspel där spelarna genom att bluffa, läsa av varandra och finna motsägelser i uttalanden ska lyckas avgöra vilka i sällskapet som har blivit tilldelade varulvsroller! Pekar byborna ut rätt person(er) när tiden har runnit ut och sanningens ögonblick är här?</p>
      )}

      {werewolf.running && <WerewolfPlay />}

      {!werewolf.running && <button className="ui primary large button" onClick={() => startGame('werewolf')}>Starta spelet</button>}

      {werewolf.running && <button className="ui basic button" onClick={() => resetGames()}>Avsluta omgången</button>}

      {werewolf.running && werewolf.step.number < 5 && <button className="ui basic button" onClick={() => nextStep()}>Nästa steg</button>}

    </div>
  )

}

const mapStateToProps = state => {
  return {
    werewolf: state.game.game.werewolf,
    userId: state.user.user.userId
  }
}

export default connect(
  mapStateToProps,
  {resetGames, startGame, nextStep, displayCharacters, toggleLocalVideo}
)(Werewolf)

/*
{!werewolf.running && (
  <div>
    <h2>Karaktärer</h2>
    <div className="ui three stackable cards">
      {characters.map((character, i) => (
        <WerewolfCharacter key={i} display={true} character={character} />
      ))}
    </div>
  </div>
)}
*/
