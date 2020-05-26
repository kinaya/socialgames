import React from 'react'
import { connect } from 'react-redux'
import { changeGame } from '../actions/gameActions'
import { Link } from 'react-router-dom'

const GameList = ({changeGame}) => {

  return (
    <div className="gamelist">

      <div onClick={() => changeGame('werewolf')} className="card" >
        <div className="image">
          <img src="images/game1.jpg" />
        </div>
        <div className="content">
          <h3>Varulvspelet</h3>
          <p>Vem är varulven?</p>
        </div>
      </div>

      <div onClick={() => changeGame('otherwords')} className="card" >
        <div className="image">
          <img src="images/game1.jpg" />
        </div>
        <div className="content">
          <h3>Med andra ord</h3>
          <p>Gissa ordet</p>
        </div>
      </div>

      <div onClick={() => changeGame('fakeartist')} className="card" >
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

export default connect(
  null,
  { changeGame }
)(GameList)
