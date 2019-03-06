import { combineReducers } from 'redux'
import otherwords from './otherwords'
import fakeartist from './fakeartist'
import spyfall from './spyfall'
import authenticated from './authenticated'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  otherwords,
  fakeartist,
  spyfall,
  authenticated,
  form: formReducer
})
