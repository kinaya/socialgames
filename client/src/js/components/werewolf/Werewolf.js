import React, { useEffect } from 'react'
import io from "socket.io-client";
import { connect } from 'react-redux'
import WerewolfPlay from './WerewolfPlay'
import WerewolfCharacter from './WerewolfCharacter'
import WerewolfSteps from './WerewolfSteps'
import WerewolfBreadcrumb from './WerewolfBreadcrumb'
import AboutWerewolf from './AboutWerewolf'
import { startGame, resetGames } from '../../actions/gameActions'
import { nextStep, displayCharacters } from '../../actions/werewolfActions'
import { toggleCurtain } from '../../actions/userActions'
import { toast } from 'react-toastify';

import characters from './werewolf.json'

const Werewolf = ({werewolf, startGame, toggleCurtain, resetGames, displayCharacters, userId, nextStep, user}) => {

  let myCharacter = null
  for(let character of werewolf.characters) {
    if(character.userId === userId) {
      myCharacter = character.character.name
    }
  }

  return (
    <div className="">

      {werewolf.running && (
        <WerewolfBreadcrumb step={werewolf.step} />
      )}

      {werewolf.running && <WerewolfPlay myCharacter={myCharacter}/>}

      {werewolf.running && (
        <WerewolfSteps toggleCurtain={toggleCurtain} user={user} userId={userId} characters={werewolf.characters} step={werewolf.step} displayCharacters={displayCharacters} nextStep={nextStep}/>
      )}

      {!werewolf.running && (
        <AboutWerewolf />
      )}

      {!werewolf.running && <button onClick={() => startGame('werewolf')}>Starta spelet</button>}

      {werewolf.running && <button className="invisible end-game" onClick={() => resetGames()}>Avsluta omgången</button>}

    </div>
  )

}

const mapStateToProps = state => {
  return {
    werewolf: state.game.game.werewolf,
    userId: state.user.user.userId,
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  {resetGames, startGame, nextStep, displayCharacters, toggleCurtain}
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
