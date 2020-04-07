import React from 'react'

const WerewolfCharacters = ({character, display, playerName, showCharacters}) => {
  return (
    <div className={`ui card display-${display}`} >

      {playerName && (
        <div className="playername">{playerName}</div>
      )}

      <div className="image">
        <img src="https://semantic-ui.com/examples/assets/images/wireframe/image.png" />
      </div>

      {(showCharacters || display) && (
        <div className="content">
          <div className="header">{character.name}</div>
          <div className="team">{character.team}</div>
          <div className="description">{character.description}</div>
        </div>
      )}

      {!display && !showCharacters && (
        <div className="content">
          <div className="header">???</div>
          <div className="description"></div>
        </div>
      )}

    </div>
  )
}

export default WerewolfCharacters;
