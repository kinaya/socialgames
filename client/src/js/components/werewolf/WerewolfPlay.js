import React from 'react'
import { connect } from 'react-redux'
import { displayCharacters } from '../../actions/werewolfActions'
import WerewolfCharacter from './WerewolfCharacter'

const WerewolfPlay = ({werewolf, userId, displayCharacters}) => {

  return (
    <div className="ui text container center aligned">

      <div className="ui three stackable cards">
      {werewolf.characters.map((character, i) => (
        <WerewolfCharacter
          key={i}
          display={character.userId === userId ? true : false}
          playerName={character.playerName}
          character={character.character}
          showCharacters={werewolf.showCharacters}
        />
      ))}
      </div>

      <div className="ui three stackable cards info message">
        {werewolf.middleCards.map((character, i) => (
          <WerewolfCharacter
            key={i}
            display={false}
            character={character.character}
            showCharacters={werewolf.showCharacters}
          />
        ))}
      </div>

      <button className="ui primary large button" onClick={displayCharacters}>Visa alla karaktärer</button>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    werewolf: state.game.game.werewolf,
    userId: state.user.user.userId
  }
}

export default connect(mapStateToProps, { displayCharacters })(WerewolfPlay);
