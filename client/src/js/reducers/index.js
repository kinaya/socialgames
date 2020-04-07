import { combineReducers } from 'redux'
import otherwords from './otherwords'
import user from './user'
import game from './game'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  user,
  game,
  otherwords,
  form: formReducer
})
