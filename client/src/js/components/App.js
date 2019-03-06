import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from '../history';

import Header from './Header'
import Footer from './Footer'
import Start from './Start'
import GameArea from './GameArea'
import OtherWordsContainer from './otherwords/OtherWordsContainer'
import Pictionary from './pictionary/Pictionary'
import Spyfall from './spyfall/Spyfall'
import FakeArtist from './fakeartist/FakeArtist'
import NewGame from './NewGame'
import JoinGame from './JoinGame'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


import {checkUserStatus} from '../actions'
import {connect} from 'react-redux'

class App extends React.Component {

  componentDidMount() {
    // If user is logged in - redirect to /:id or requested url
    // If user is not logged in but has data in localStorage - login and redirect to /:id or requested url
    // if user is not logged in and does not have data - do nothing
    this.props.checkUserStatus()
  }

  render() {

    return (
      <Router history={history}><div>

        <Header />

        <ToastContainer position={toast.POSITION.TOP_CENTER} />

        <main className="ui text container">

          <Switch>
            <Route exact path='/' component={Start} />
            <Route exact path='/newgame' component={NewGame} />
            <Route exact path='/joinGame' component={JoinGame} />

            <Route path='/:id' component={GameArea} />

          </Switch>

        </main>

        <Footer />

      </div></Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated
  }
}

export default connect(
  mapStateToProps,
  { checkUserStatus }
)(App)
