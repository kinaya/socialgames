import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'

import Start from './Start'
import OtherWordsContainer from '../containers/OtherWordsContainer'
import FakeArtist from './FakeArtist'
import Pictionary from './Pictionary'

class App extends React.Component {

  render() {
    return (
      <Router>
      <div>
        <div className="header">
          <Link to='/'>Social Games</Link>
        </div>

        <main>
          <Route exact path='/' component={Start} />
          <Route path='/other-words' component={OtherWordsContainer} />
          <Route path='/pictionary' component={Pictionary} />
          <Route path='/fake-artist' component={FakeArtist} />
        </main>

        </div>
      </Router>
    )
  }
}

export default App;
