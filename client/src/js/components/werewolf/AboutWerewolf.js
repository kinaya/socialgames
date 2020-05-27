import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startGame, changeGame } from '../../actions/gameActions'

const AboutWerewolf = ({authenticated, startGame, changeGame}) => {

  return (
    <div className="container">
      <h1>Varulvspelet</h1>
      <p>Diskussionsspel där spelarna genom att bluffa, läsa av varandra och finna motsägelser i uttalanden ska lyckas avgöra vilka i sällskapet som har blivit tilldelade varulvsroller!</p>
      <p>Pekar byborna ut rätt person(er) när tiden har runnit ut och sanningens ögonblick är här?</p>

      {!authenticated && (
        <div className="buttons">
          <Link to='/newgame' className="button" role="button">
            Skapa nytt spelrum
          </Link>
          <Link to='/joingame' className="button" role="button">
            Gå med i spelrum
          </Link>
        </div>
      )}

      {authenticated && (
        <div className="buttons">
          <button onClick={() => startGame('werewolf')}>Starta spelet</button>
          <button className="gray" onClick={() => changeGame(null)}>Byt spel</button>
        </div>
      )}

    </div>
  )
}

const mapStateToProps = state => {
  return {
    authenticated: state.user.authenticated
  }
}

export default connect(
  mapStateToProps,
  {startGame, changeGame}
)(AboutWerewolf)
