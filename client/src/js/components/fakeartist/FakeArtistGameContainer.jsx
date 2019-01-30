import { connect } from 'react-redux'
import FakeArtistGame from './FakeArtistGame'
import { fa_updateUsers, fa_setGameState, fa_updateGame, fa_updateWord, fa_resetGame } from '../../actions'

const mapStateToProps = state => {
  return {
    game: state.fakeartist.game,
    userId: sessionStorage.getItem('userId'),
    userName: sessionStorage.getItem('userName')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fa_resetGame: () => dispatch(fa_resetGame()),
    fa_updateUsers: (users) => dispatch(fa_updateUsers(users)),
    fa_updateGame: (game) => dispatch(fa_updateGame(game)),
    fa_updateWord: (word) => dispatch(fa_updateWord(word)),
    fa_setGameState: (state) => dispatch(fa_setGameState(state))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FakeArtistGame)
