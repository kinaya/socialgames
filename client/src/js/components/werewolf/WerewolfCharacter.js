import React from 'react'

const WerewolfCharacters = ({character, display, playerName, showCharacters}) => {
  return (
    <div className={`ui card display-${display}`} >

      {(showCharacters || display) && (
        <>
        <div className="image">
          <img src="https://semantic-ui.com/examples/assets/images/wireframe/image.png" />
        </div>
        <div className="content">
          <div className="header">{character.name}</div>
          <div className="description">{character.description}</div>
        </div>
        </>
      )}

      {!display && !showCharacters && (
        <>
        <div className="image">
          <img src="https://semantic-ui.com/examples/assets/images/wireframe/image.png" />
        </div>
        <div className="content">
          <div className="header">???</div>
          <div className="description"></div>
        </div>
        </>
      )}

      {playerName && (
        <div>{playerName}</div>
      )}

    </div>
  )
}

export default WerewolfCharacters;
