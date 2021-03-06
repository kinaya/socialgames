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
    <>

      {werewolf.running && (
        <div className="container">
          <WerewolfBreadcrumb step={werewolf.step} />
        </div>
      )}

      {werewolf.running && (
        <div className="container">
          <WerewolfPlay myCharacter={myCharacter}/>
        </div>
      )}

      {werewolf.running && (
        <div className="container">
          <WerewolfSteps toggleCurtain={toggleCurtain} user={user} userId={userId} characters={werewolf.characters} step={werewolf.step} displayCharacters={displayCharacters} nextStep={nextStep}/>
        </div>
      )}

      {!werewolf.running && (
        <AboutWerewolf />
      )}

      {werewolf.running && (
        <div className="container">
          <button className="invisible end-game" onClick={() => resetGames()}>Avsluta omgången</button>
        </div>
      )}

    </>
  )

}

const mapStateToProps = state => {
  return {
    werewolf: state.sharedState.game.werewolf,
    userId: state.localState.user.user.userId,
    user: state.localState.user
  }
}

export default connect(
  mapStateToProps,
  {resetGames, startGame, nextStep, displayCharacters, toggleCurtain}
)(Werewolf)
