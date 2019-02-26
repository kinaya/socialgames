import React from 'react'
import App from './js/components/App'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import './sass/style.scss'
import otherWords from './otherWords.json'

// Initial store
const initialStore = {
  fakeartist: {
    game: {
      game: {},
      users: [],
      word: {}
    }
  },
  otherwords: {
    gamestate: 'intro',
    currentword: null,
    score: 0,
    time: 30,
    settings: {
      forbidden: true,
      timer: 30
    },
    words: otherWords,
  }
}

const store = configureStore(initialStore)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
