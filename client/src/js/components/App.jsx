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

import history from '../history';

class App extends React.Component {


  render() {

    return (
      <Router history={history}>
      <div>
        <div className="header">
          <Link to='/'>Social Games</Link>
        </div>

        <main>
          <Switch>

          <Route exact path='/' component={Start} />
          <Route path='/other-words' component={OtherWordsContainer} />
          <Route path='/pictionary' component={Pictionary} />
          <Route exact path='/fake-artist' component={FakeArtistIntro} />
          <Route exact path='/fake-artist/create' component={CreateGame} />
          <Route exact path='/fake-artist/join' component={JoinGame} />
          <Route path="/fake-artist/:id" component={FakeArtistGame} />

          </Switch>

        </main>

        </div>
      </Router>
    )
  }
}

export default App;
