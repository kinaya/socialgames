import { combineReducers } from 'redux'
import otherwords from './otherwords'
import fakeartist from './fakeartist'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  otherwords,
  fakeartist,
  form: formReducer
})
