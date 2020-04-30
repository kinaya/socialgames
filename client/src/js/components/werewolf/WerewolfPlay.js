import React from 'react'
import { connect } from 'react-redux'
import WerewolfCharacter from './WerewolfCharacter'
import { switchCharacters } from '../../actions/werewolfActions'

const WerewolfPlay = ({werewolf, userId, switchCharacters}) => {

  const handleClick = (clicketCharNr) => {
    let ownCharNr = null;
    for(let i = 0; i < werewolf.characters.length; i++) {
      if(werewolf.characters[i].userId === userId)
      ownCharNr = i;
    }
    switchCharacters(ownCharNr, clicketCharNr)
  }

  return (
    <div className="werewolf-cards">
      {werewolf.characters.map((character, i) => (
        <WerewolfCharacter
          key={i}
          ownCharacter={character.userId === userId}
          step={werewolf.step}
          playerName={character.playerName}
          character={character.character}
          showCharacters={werewolf.showCharacters}
          handleClick={() => handleClick(i)}
        />
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    werewolf: state.game.game.werewolf,
    userId: state.user.user.userId
  }
}

export default connect(mapStateToProps, {switchCharacters})(WerewolfPlay);
