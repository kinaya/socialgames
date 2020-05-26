import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import WerewolfCharacter from './WerewolfCharacter'
import { switchCharacters } from '../../actions/werewolfActions'

const WerewolfPlay = ({myCharacter, werewolf, userId, switchCharacters}) => {
  const [seerCount, setSeerCount] = useState(0)
  const [seerFinished, setSeerFinished] = useState(false)
  const [characterVisibility, setCharacterVisibility] = useState([])
  const [characterClickability, setCharacterClickability] = useState([])

  const handleClick = (nr) => {

    if(!characterClickability[nr]) { return; }

    // Siare
    if(werewolf.step.number === 3 && myCharacter === 'Siare') {

      if(!seerFinished) {
        let clickability = []
        for(let character of werewolf.characters) {
          if(werewolf.characters[nr].userId || seerCount + 1 >= 2 || character.userId || werewolf.characters[nr] == character ) {
            console.log('character should not be clickable', character)
            clickability.push(false)
          } else {
            console.log('character SHOULD be clickable', character)
            clickability.push(true)
          }
          setCharacterClickability(clickability)
        }

        if(werewolf.characters[nr].userId || seerCount + 1 >= 2) {
          setSeerFinished(true)
        }

        setCharacterVisibility({...characterVisibility, [nr]: true});
        setSeerCount(prevState => prevState + 1);
      }
    }

    // Handle Tjuv
    if(werewolf.step.number === 4 && myCharacter === 'Tjuv') {

      let ownCharNr = null;
      for(let i = 0; i < werewolf.characters.length; i++) {
        if(werewolf.characters[i].userId === userId)
        ownCharNr = i;
      }

      // Set own and clicked card visibility to true
      setCharacterVisibility({...characterVisibility, [ownCharNr]: true, [nr]: true });

      // Set clickability to false for all
      let clickability = []
      for(let character of werewolf.characters) {
        clickability.push(false)
      }
      setCharacterClickability(clickability);

      // Switch the cards locally
/*      console.log('own char:', werewolf.characters[ownCharNr].character);
      console.log('clicked char:', werewolf.characters[nr].character)
      let temp = werewolf.characters[nr].character
      werewolf.characters[nr].character = werewolf.characters[ownCharNr].character
      werewolf.characters[nr].character = temp
      console.log('updated own char:', werewolf.characters[ownCharNr].character)*/


//      werewolf.characters[nr] = werewolf.characters[ownCharNr]
//      werewolf.characters[ownCharNr] = temp

      // Do this when thief clicks next!
      switchCharacters(ownCharNr, nr)
    }

  }

  // Set visibility status depending on current step and asigned role
  // Run on first render and when step is updated
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

  // Set clickability depending on step and asinged role
  const setClickability = () => {
    let clickability = []
    for(let character of werewolf.characters) {
      if((werewolf.step.number === 3 && myCharacter === 'Siare' && character.userId != userId) ||
        (werewolf.step.number === 4 && myCharacter === 'Tjuv' && character.userId != userId )) {
        clickability.push(true)
      } else {
        clickability.push(false)
      }
    }
    setCharacterClickability(clickability)
  }

  useEffect(() => {
    setStatus()
    setClickability()
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
