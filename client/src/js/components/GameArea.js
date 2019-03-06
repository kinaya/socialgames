import React from 'react'
import GameList from './GameList'
import JoinGameForm from './JoinGameForm'
import { connect } from 'react-redux'

const GameArea = ({match, authenticated}) => {

  return (
    <div>

      {authenticated && (
        <div>
        <div className="ui info message">
          <h2>Bjud in spelare</h2>
          <p>Använd spelkoden eller länken nedan för att bjuda in andra att spela med</p>
          <p className="code"><span>Spelkod:</span> {match.params.id}</p>
          <p className="link"><span>Direktlänk:</span> https://socialgamesapp.herokuapp.com/{match.params.id}</p>
        </div>

        <GameList gameCode={match.params.id}/>
        </div>
      )}

      {!authenticated && (
        <JoinGameForm initialValues={{code: match.params.id}} />
      )}

    </div>
  )
}

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated
  }
}

export default connect(
  mapStateToProps,
  null
)(GameArea)
