import { connect } from 'react-redux'
import OtherWords from './OtherWords'
import { changeWord, skipWord, setGameState, changeSettings, finishRound, resetGame, newRound, startGame } from '../../actions'

const mapStateToProps =  state => {
  return {
    currentword: state.otherwords.currentword,
    settings: state.otherwords.settings,
    score: state.otherwords.score,
    time: state.otherwords.time,
    gamestate: state.otherwords.gamestate
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeWord: () => dispatch(changeWord()),
    skipWord: () => dispatch(skipWord()),
    setGameState: (gameState) => dispatch(setGameState(gameState)),
    changeSettings: (what, how) => dispatch(changeSettings(what, how)),
    resetGame: () => dispatch(resetGame()),
    finishRound: () => dispatch(finishRound()),
    startGame: () => dispatch(startGame()),
    newRound: () => dispatch(newRound())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OtherWords)
