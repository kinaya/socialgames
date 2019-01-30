import React from 'react'
import { Router } from 'react-router-dom'
import createHistory from 'history/createMemoryHistory';
import { Route, Link } from 'react-router-dom'

import Start from './Start'
import OtherWordsContainer from './otherwords/OtherWordsContainer'
import FakeArtistContainer from './fakeartist/FakeArtistContainer'
import Pictionary from './pictionary/Pictionary'
import FakeArtistGameContainer from './fakeartist/FakeArtistGameContainer'

import history from './history';

class App extends React.Component {


  render() {

    return (
      <Router history={history}>
      <div>
        <div className="header">
          <Link to='/'>Social Games</Link>
        </div>

        <main>
          <Route exact path='/' component={Start} />
          <Route path='/other-words' component={OtherWordsContainer} />
          <Route path='/pictionary' component={Pictionary} />
          <Route exact path='/fake-artist' component={FakeArtistContainer} />
          <Route path='/fake-artist/play' component={FakeArtistGameContainer} />
        </main>

        </div>
      </Router>
    )
  }
}

export default App;
