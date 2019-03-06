import React from 'react'
import GameList from './GameList'
import JoinGameForm from './JoinGameForm'
import { connect } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import OtherWordsContainer from './otherwords/OtherWordsContainer'
import Pictionary from './pictionary/Pictionary'
import Spyfall from './spyfall/Spyfall'
import FakeArtist from './fakeartist/FakeArtist'
import history from '../history';

const GameArea = ({match, authenticated}) => {

  return (
    <div>

      {authenticated && (
        <Switch>

        <Route exact path='/:id'><div>
          <div className="ui info message">
            <h2>Bjud in spelare</h2>
            <p>Använd spelkoden eller länken nedan för att bjuda in andra att spela med</p>
            <p className="code"><span>Spelkod:</span> {match.params.id}</p>
            <p className="link"><span>Direktlänk:</span> https://socialgamesapp.herokuapp.com/{match.params.id}</p>
          </div>
          <GameList gameCode={match.params.id}/></div>
        </Route>

          <Route exact path='/:id/fake-artist' component={FakeArtist} />
          <Route exact path='/:id/other-words' component={OtherWordsContainer} />
          <Route exact path='/:id/pictionary' component={Pictionary} />
          <Route exact path='/:id/spyfall' component={Spyfall} />

        </Switch>
      )}

      {!authenticated && (
        <div>
          <h1 className="heading">Gå med i ett spel</h1>
          <JoinGameForm initialValues={{code: match.params.id}} />
        </div>
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
