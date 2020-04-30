import React from 'react'

const WerewolfCharacters = ({visibility, clickability, character, playerName, showCharacters, handleClick}) => {

  return (
    <div className={`ui card display-${visibility}`} onClick={handleClick}>

      {playerName && (
        <div className="playername">{playerName}</div>
      )}

      <div className="image">
        {(showCharacters || visibility) ? (
          <img src={`images/${character.name}.png`} />
        ):(
          <img src="images/questionmark.png" />
        )}

      </div>

      {(showCharacters || visibility) && (
        <div className="content">
          <div className="header">{character.name}</div>
          <div className="description">{character.description}</div>
        </div>
      )}

      {!visibility && !showCharacters && (
        <div className="content">
          <div className="header"></div>
          <div className="description"></div>
        </div>
      )}

    </div>
  )
}

export default WerewolfCharacters;
