import React from 'react'

const WerewolfCharacters = ({character, display, playerName, showCharacters}) => {
  return (
    <div className={`ui card display-${display} ${character.name}`} >

      {playerName && (
        <div className="playername">{playerName}</div>
      )}

      <div className="image">
        {(showCharacters || display) ? (
          <img src={`${character.name}.png`} />
        ):(
          <img src="questionmark.png" />
        )}

      </div>

      {(showCharacters || display) && (
        <div className="content">
          <div className="header">{character.name}</div>
          <div className="description">{character.description}</div>
        </div>
      )}

      {!display && !showCharacters && (
        <div className="content">
          <div className="header"></div>
          <div className="description"></div>
        </div>
      )}

    </div>
  )
}

export default WerewolfCharacters;
