import { connect } from 'react-redux'
import OtherWords from './OtherWords'
import { changeWord, skipWord, setGameState, changeSettings, finishRound, resetGame, newRound, startGame } from '../../actions'

function mapStateToProps(state) {
  return {
    currentword: state.otherwords.currentword,
    settings: state.otherwords.settings,
    score: state.otherwords.score,
    time: state.otherwords.time,
    gamestate: state.otherwords.gamestate
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeWord: () => dispatch(changeWord()),
    skipWord: () => dispatch(skipWord()),
    setGameState: (gameState) => dispatch(setGameState(gameState)),
    changeSettings: (what, how) => dispatch(changeSettings(what, how)),
//    stopTimer: () => dispatch(stopTimer())
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
