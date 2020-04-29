import React, { useEffect, useState } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import history from '../history';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import ReactLoading from 'react-loading';

import Header from './Header'
import Footer from './Footer'
import Start from './Start'
import GameArea from './GameArea'
import NewGame from './NewGame'
import JoinGame from './JoinGame'
import { checkUserStatus } from '../actions/userActions'

const App = props => {

  const [isAuthChecked, setIsAuthChecked] = useState(false)

  useEffect(() => {
    props.checkUserStatus()
    setIsAuthChecked(true)
  },[])

  return (
      <Router history={history}><>
        <Header />
        <ToastContainer position={toast.POSITION.TOP_CENTER} />
        <main className="ui text">
          {!isAuthChecked && (
            <ReactLoading />
          )}
          {isAuthChecked && (
            <Switch>
              <Route exact path='/' component={Start} />
              <Route exact path='/newgame' component={NewGame} />
              <Route exact path='/joinGame' component={JoinGame} />
              <Route path='/:id' component={GameArea} />
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
