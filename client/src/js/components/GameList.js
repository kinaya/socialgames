import React from 'react'
import { connect } from 'react-redux'
import { changeGame } from '../actions/gameActions'
import { Link } from 'react-router-dom'

const GameList = ({changeGame}) => {

  return (
    <div className="ui three stackable cards">

      <div onClick={() => changeGame('werewolf')} className="ui card" >
        <div className="image">
          <img src="https://semantic-ui.com/examples/assets/images/wireframe/image.png" />
        </div>
        <div className="content">
          <div className="header">Varulvspelet</div>
          <div className="description">Vem är varulven?</div>
        </div>
      </div>

      <div onClick={() => changeGame('otherwords')} className="ui card" >
        <div className="image">
          <img src="https://semantic-ui.com/examples/assets/images/wireframe/image.png" />
        </div>
        <div className="content">
          <div className="header">Med andra ord</div>
          <div className="description">Gissa ordet</div>
        </div>
      </div>

      <div onClick={() => changeGame('fakeartist')} className="ui card" >
        <div className="image">
          <img src="https://semantic-ui.com/examples/assets/images/wireframe/image.png" />
        </div>
        <div className="content">
          <div className="header">Fake artist</div>
          <div className="description">Vem luras?</div>
        </div>
      </div>

    </div>
  )
}

export default connect(
  null,
  { changeGame }
)(GameList)
