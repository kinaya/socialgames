import React from 'react'
import App from './js/components/App'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import './sass/style.scss'

const store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
