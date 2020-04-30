import React from 'react'

const WerewolfCharacters = ({character, ownCharacter, playerName, showCharacters, handleClick}) => {

  return (
    <div className={`ui card display-${ownCharacter} ${character.name}`} onClick={handleClick}>

      {playerName && (
        <div className="playername">{playerName}</div>
      )}

      <div className="image">
        {(showCharacters || ownCharacter) ? (
          <img src={`images/${character.name}.png`} />
        ):(
          <img src="images/questionmark.png" />
        )}

      </div>

      {(showCharacters || ownCharacter) && (
        <div className="content">
          <div className="header">{character.name}</div>
          <div className="description">{character.description}</div>
        </div>
      )}

      {!ownCharacter && !showCharacters && (
        <div className="content">
          <div className="header"></div>
          <div className="description"></div>
        </div>
      )}

    </div>
  )
}

export default WerewolfCharacters;
