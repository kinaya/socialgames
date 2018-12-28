import React from 'react'
import App from './js/components/App'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import './sass/style.scss'

// Initial store
const initialStore = {
  otherwords: {
    gamestate: 'intro',
    currentword: null,
    score: 0,
    time: 30,
    settings: {
      forbidden: true,
      timer: 30
    },
    words: [
      {
        word: 'Brandbil',
        forbidden: [
          'Eld', 'Fordon', 'Röd'
        ],
        used: false
      },
      {
        word: 'Jongleringsboll',
        forbidden: [
          'Sport', 'Clown', 'Cirkus'
        ],
        used: false
      },
      {
        word: 'Äppelmos',
        forbidden: [
          'Frukt', 'Pure', 'Pannkaka'
        ],
        used: false
      },
      {
        word: 'Privatdektektiv',
        forbidden: [
          'Eld', 'Fordon', 'Röd'
        ],
        used: false
      },
      {
        word: 'Snöbollskrig',
        forbidden: [
          'Sport', 'Clown', 'Cirkus'
        ],
        used: false
      },
      {
        word: 'Matlåda',
        forbidden: [
          'Frukt', 'Pure', 'Pannkaka'
        ],
        used: false
      }
    ]
  }
}

const store = configureStore(initialStore)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
