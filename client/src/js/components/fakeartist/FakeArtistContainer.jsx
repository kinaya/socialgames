import { connect } from 'react-redux'
import FakeArtist from './FakeArtist'
import {fa_addRemoveUser, fa_createGame, fa_setGameState, fa_resetGame} from '../../actions'

const mapStateToProps = (state) => {
  return {
    gamestate: state.fakeartist.gamestate
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fa_setGameState: (state) => dispatch(fa_setGameState(state)),
    fa_createGame: (name) => dispatch(fa_createGame(name)),
    fa_addRemoveUser: (addOrRemove, code, name, userId) => dispatch(fa_addRemoveUser(addOrRemove, code, name, userId)),
    fa_resetGame: () => dispatch(fa_resetGame())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FakeArtist)
