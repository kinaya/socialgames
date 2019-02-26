import React from 'react'
import { Router } from 'react-router-dom'
import createHistory from 'history/createMemoryHistory';
import { Route, Link, Switch } from 'react-router-dom'

import Start from './Start'
import OtherWordsContainer from './otherwords/OtherWordsContainer'
import FakeArtistIntro from './fakeartist/FakeArtistIntro'
import Pictionary from './pictionary/Pictionary'
import FakeArtistGame from './fakeartist/FakeArtistGame'
import CreateGameForm from './fakeartist/CreateGameForm'
import JoinGameForm from './fakeartist/JoinGameForm'
import CreateGame from './fakeartist/CreateGame'
import JoinGame from './fakeartist/JoinGame'
import FakeArtistGameArea from './fakeartist/FakeArtistGameArea'
import Spyfall from './spyfall/Spyfall'

import history from '../history';

class App extends React.Component {


  render() {

    return (
      <Router history={history}>
      <div>
        <div className="site-header">
          <Link className="ui pink button" to='/'>Socials spel</Link>
        </div>

        <main className="ui container">

          <Switch>
            <Route exact path='/' component={Start} />
            <Route path='/other-words' component={OtherWordsContainer} />
            <Route path='/pictionary' component={Pictionary} />
            <Route path='/spyfall' component={Spyfall} />
            <Route exact path='/fake-artist' component={FakeArtistIntro} />
            <Route exact path='/fake-artist/create' component={CreateGame} />
            <Route exact path='/fake-artist/join' component={JoinGame} />
            <Route path="/fake-artist/:id" component={FakeArtistGameArea} />
          </Switch>

        </main>

        </div>
      </Router>
    )
  }
}

export default App;
