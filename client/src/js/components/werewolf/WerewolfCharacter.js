import React from 'react'

//           <img src={`images/${character.name}_liten.png`} />

const WerewolfCharacters = ({visibility, clickability, character, playerName, showCharacters, handleClick}) => {

  return (
    <div className={`card clickability-${clickability} display-${visibility} showCharacters-${showCharacters}`} onClick={handleClick}>

      {playerName && (
        <div className="playername">{playerName}</div>
      )}

      {(showCharacters || visibility) && (
        <>
          <div className="image">
            <img src={`images/${character.name}.jpg`} />
          </div>
          <div className="content">
            <h3>{character.name}</h3>
            <p>{character.description}</p>
          </div>
        </>
      )}

    </div>
  )
}

export default WerewolfCharacters;
