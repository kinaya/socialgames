import { combineReducers } from 'redux'
import otherwords from './otherwords'
import user from './user'
import sharedState from './sharedState'
import { reducer as formReducer } from 'redux-form'

/*export default combineReducers({
  user,
  sharedState,
  otherwords,
  form: formReducer
})*/

export default combineReducers({
  sharedState,
  localState: combineReducers({
    user,
    otherwords
  }),
  form: formReducer
});
