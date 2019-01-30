import { connect } from 'react-redux'
import FakeArtist from './FakeArtist'
import {fa_joinGame, fa_createGame, fa_setGameState } from '../../actions'

const mapStateToProps = (state) => {
  return {
    gamestate: state.fakeartist.gamestate
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fa_setGameState: (state) => dispatch(fa_setGameState(state)),
    fa_createGame: (userName) => dispatch(fa_createGame(userName)),
    fa_joinGame: (userName, gameCode) => dispatch(fa_joinGame(userName, gameCode))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FakeArtist)
