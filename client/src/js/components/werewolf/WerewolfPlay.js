import React from 'react'
import { connect } from 'react-redux'
import WerewolfCharacter from './WerewolfCharacter'

const WerewolfPlay = ({werewolf, userId}) => {

  return (
    <div className="werewolf-cards">
      {werewolf.characters.map((character, i) => (
        <WerewolfCharacter
          key={i}
          display={character.userId === userId ? true : false}
          playerName={character.playerName}
          character={character.character}
          showCharacters={werewolf.showCharacters}
        />
      ))}
      {werewolf.middleCards.map((character, i) => (
        <WerewolfCharacter
          key={i}
          display={false}
          character={character.character}
          showCharacters={werewolf.showCharacters}
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

export default connect(mapStateToProps, null)(WerewolfPlay);
