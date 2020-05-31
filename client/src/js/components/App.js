import React, { useEffect, useState } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import history from '../history';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import ReactLoading from 'react-loading';

import Page from './Page'
import Header from './Header'
import Footer from './Footer'
import Start from './Start'
import GameArea from './GameArea'
import NewGame from './NewGame'
import JoinGame from './JoinGame'
import AboutWerewolf from './werewolf/AboutWerewolf'
import AboutOtherWords from './otherwords/AboutOtherWords'
import AboutFakeArtist from './fakeartist/AboutFakeArtist'
import { checkUserStatus } from '../actions/userActions'

const App = ({checkUserStatus}) => {

  const [isAuthChecked, setIsAuthChecked] = useState(false)

  useEffect(() => {
    checkUserStatus()
    setIsAuthChecked(true)
  },[])

  return (
    <Router history={history}><>
      <Header />
      <ToastContainer position={toast.POSITION.TOP_CENTER} />
      <main>
        {!isAuthChecked && (
          <ReactLoading />
        )}
        {isAuthChecked && (
          <Switch>
            <Page exact path='/' component={Start} title="Start" />
            <Page exact path='/newgame' component={NewGame} title="Nytt rum" />
            <Page exact path='/joinGame' component={JoinGame} title="Gå med" />
            <Page exact path='/werewolf' component={AboutWerewolf} title="Varulvspelet" />
            <Page exact path='/otherwords' component={AboutOtherWords} title="Med andra ord" />
            <Page exact path='/fakeartist' component={AboutFakeArtist} title="Fake artist" />
            <Page path='/:id' component={GameArea} title="Aktivt spel" />
          </Switch>
        )}
      </main>
      <Footer />
    </></Router>
  )

}

export default connect(
  null,
  { checkUserStatus }
)(App)
