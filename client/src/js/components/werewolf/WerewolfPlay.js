import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import WerewolfCharacter from './WerewolfCharacter'
import { switchCharacters } from '../../actions/werewolfActions'

const WerewolfPlay = ({myCharacter, werewolf, userId, switchCharacters}) => {
  const [seerCount, setSeerCount] = useState(0)
  const [characterVisibility, setCharacterVisibility] = useState([])
  const [characterClickability, setCharacterClickability] = useState([])

  const handleClick = (nr) => {
    if(werewolf.step.number === 3 && myCharacter === 'Siare') {
      setCharacterVisibility({...characterVisibility, [nr]: true});
    }
    if(werewolf.step.number === 4 && myCharacter === 'Tjuv') {
      let ownCharNr = null;
      for(let i = 0; i < werewolf.characters.length; i++) {
        if(werewolf.characters[i].userId === userId)
        ownCharNr = i;
      }
      switchCharacters(ownCharNr, nr)
    }
  }

  const setStatus = () => {
    let visibility = []
    for(let character of werewolf.characters) {
      if((werewolf.step.number === 1 && character.userId === userId) ||
      (werewolf.step.number === 2 && myCharacter === 'Varulv' && character.character.name === 'Varulv') ||
      (werewolf.step.number === 3 && myCharacter === 'Siare' && character.userId === userId ) ||
      (werewolf.step.number === 4 && myCharacter === 'Tjuv' && character.userId === userId)) {
        visibility.push(true)
      } else {
        visibility.push(false)
      }
    }
    setCharacterVisibility(visibility)
  }

  useEffect(() => {
    setStatus()
  }, [werewolf.step.number])

  return (
    <div className="werewolf-cards">
      {werewolf.characters.map((character, i) => (
        <WerewolfCharacter
          key={i}
          visibility={characterVisibility[i]}
          clickability={characterClickability[i]}
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
