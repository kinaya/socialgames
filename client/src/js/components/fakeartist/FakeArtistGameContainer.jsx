import { connect } from 'react-redux'
import FakeArtistGame from './FakeArtistGame'
import { fa_sse_addRemoveUser, fa_resetGame, fa_startStopGame, fa_updateGame, fa_exitRound, fa_sse_startStopGame, fa_sse_exitRound, fa_addRemoveUser } from '../../actions'

function mapStateToProps(state) {
  return {
    game: state.fakeartist.game,
    userId: sessionStorage.getItem('userId'),
    userName: sessionStorage.getItem('userName')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fa_sse_addRemoveUser: (data) => dispatch(fa_sse_addRemoveUser(data)),
    fa_startStopGame: (startOrStop, game) => dispatch(fa_startStopGame(startOrStop, game)),
    fa_addRemoveUser: (addOrRemove, code, name, userId) => dispatch(fa_addRemoveUser(addOrRemove, code, name, userId)),
    fa_sse_startStopGame: (data) => dispatch(fa_sse_startStopGame(data)),
    fa_resetGame: () => dispatch(fa_resetGame())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FakeArtistGame)
