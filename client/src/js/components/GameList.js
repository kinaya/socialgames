import React from 'react'
import { connect } from 'react-redux'
import { changeGame } from '../actions/gameActions'
import { Link } from 'react-router-dom'
import history from '../history'

const GameList = ({authenticated, changeGame}) => {

  const navigate = (url) => {
    history.push(url)
  }

  return (
    <div className="gamelist">

      <div onClick={authenticated ? () => changeGame('werewolf') : () => navigate('/werewolf')} className="card" >
        <div className="image">
          <img src="images/game1.jpg" />
        </div>
        <div className="content">
          <h3>Varulvspelet</h3>
          <p>Vem är varulven?</p>
        </div>
      </div>

      <div onClick={authenticated ? () => changeGame('otherwords') : () => navigate('/otherwords')} className="card" >
        <div className="image">
          <img src="images/game1.jpg" />
        </div>
        <div className="content">
          <h3>Med andra ord</h3>
          <p>Gissa ordet</p>
        </div>
      </div>

      <div onClick={authenticated ? () => changeGame('fakeartist') : () => navigate('/fakeartist')} className="card" >
        <div className="image">
          <img src="images/game1.jpg" />
        </div>
        <div className="content">
          <h3>Fake artist</h3>
          <p>Vem luras?</p>
        </div>
      </div>

    </div>
  )
}

const mapStateToProps = state => {
  return {
    authenticated: state.localState.user.authenticated,
  }
}
export default connect(
  mapStateToProps,
  { changeGame }
)(GameList)
