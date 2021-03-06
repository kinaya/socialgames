import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import wsMiddleware from './js/middleware/middleware'
import { createLogger } from 'redux-logger'
import rootReducer from './js/reducers'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      wsMiddleware,
      loggerMiddleware
    )
  )
}
