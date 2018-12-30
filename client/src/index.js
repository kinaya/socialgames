import React from 'react'
import App from './js/components/App'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './configureStore'

import './sass/style.scss'

// Initial store
const initialStore = {
  fakeartist: {
    gamestate: 'intro',
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
          'Ture', 'Förstoringsglas', 'Brott'
        ],
        used: false
      },
      {
        word: 'Snöbollskrig',
        forbidden: [
          'Boll', 'Is', 'Vit'
        ],
        used: false
      },
      {
        word: 'Matlåda',
        forbidden: [
          'Lunch', 'Äta', 'Plast'
        ],
        used: false
      },
      {
        word: 'Gränna',
        forbidden: [
          'Polkagris', 'Stad', 'Randig'
        ],
        used: false
      },
      {
        word: 'Victoriasjön',
        forbidden: [
          'Afrika', 'Vatten', 'Blöt'
        ],
        used: false
      },
      {
      word: 'Diarré',
        forbidden: [
          'Mage', 'Rinnande', 'Bajs'
        ],
        used: false
      },
      {
      word: 'Jak',
        forbidden: [
          'Djur', 'Hårig', 'Berg'
        ],
        used: false
      },
      {
      word: 'Tampong',
        forbidden: [
          'Mens', 'Avlång', 'Kvinna'
        ],
        used: false
      },
      {
      word: 'Grodyngel',
        forbidden: [
          'Barn', 'Vatten', 'Svans'
        ],
        used: false
      },
      {
      word: 'Vintergatan',
        forbidden: [
          'Stjärna', 'Himlen', 'Lysa'
        ],
        used: false
      },
      {
      word: 'Ungern',
        forbidden: [
          'Land', 'Europa', 'Budapest'
        ],
        used: false
      },
      {
      word: 'President',
        forbidden: [
          'Statsminister', 'Chef', 'Demokrati'
        ],
        used: false
      },
      {
      word: 'Björnligan',
        forbidden: [
          'Kalle Anka', 'Tjuv', 'Djur'
        ],
        used: false
      },
      {
      word: 'Aborre',
        forbidden: [
          'Djur', 'Fisk', 'Vatten'
        ],
        used: false
      },
      {
      word: 'Ananas',
        forbidden: [
          'Frukt', 'Rutig', 'Konserv'
        ],
        used: false
      },
      {
      word: 'Badanka',
        forbidden: [
          'Vatten', 'Plast', 'Gul'
        ],
        used: false
      },
      {
      word: 'Bakterie',
        forbidden: [
          'Liten', 'Kroppen', 'Virus'
        ],
        used: false
      },
      {
      word: 'Barnkalas',
        forbidden: [
          'Fest', 'Tårta', 'Födelsedag'
        ],
        used: false
      },
      {
      word: 'Barskåp',
        forbidden: [
          'Alkohol', 'Möbel', 'Sprit'
        ],
        used: false
      },
      {
      word: 'Bilfärja',
        forbidden: [
          'Båt', 'Fordon', 'Vatten'
        ],
        used: false
      },
      {
      word: 'Biskvi',
        forbidden: [
          'Bakverk', 'Kaka', 'Söt'
        ],
        used: false
      },
      {
      word: 'Bisonoxe',
        forbidden: [
          'Djur', 'Stor', 'Geting'
        ],
        used: false
      },
      {
      word: 'Blogg',
        forbidden: [
          'Internet', 'Hemsida', 'Kändis'
        ],
        used: false
      },
      {
      word: 'Blåbär',
        forbidden: [
          'Bär', 'Färg', 'Soppa'
        ],
        used: false
      },
      {
      word: 'Fågelskrämma',
        forbidden: [
          'Åker', 'Halm', 'Docka'
        ],
        used: false
      },
      {
      word: 'Bokmal',
        forbidden: [
          'Läsa', 'Djur', 'Bibliotek'
        ],
        used: false
      },
      {
      word: 'Bredband',
        forbidden: [
          'Internet', 'Modem', 'Wifi'
        ],
        used: false
      },
      {
      word: 'Bensin',
        forbidden: [
          'Diesel', 'Fordon', 'Tanka'
        ],
        used: false
      },
      {
      word: 'Bandage',
        forbidden: [
          'Skada', 'Sår', 'Gips'
        ],
        used: false
      },
      {
      word: 'Betyg',
        forbidden: [
          'Skola', 'Omdöme', 'Papper'
        ],
        used: false
      },
      {
      word: 'Bulle',
        forbidden: [
          'Kanel', 'Kaka', 'Bakverk'
        ],
        used: false
      },
      {
      word: 'Bärgningsbil',
        forbidden: [
          'Fordon', 'Trasig', 'Krok'
        ],
        used: false
      },
      {
      word: 'Gummiboll',
        forbidden: [
          'Rund', 'Studsa', 'Leksak'
        ],
        used: false
      },
      {
      word: 'Chili',
        forbidden: [
          'Grönsak', 'Stark', 'Röd'
        ]
      },
      {
      word: 'Dörrvakt',
        forbidden: [
          'Biffig', 'Yrke', 'Klubb'
        ],
        used: false
      },
      {
      word: 'Gummistövlar',
        forbidden: [
          'Skor', 'Regn', 'Fot'
        ],
        used: false
      },
      {
      word: 'Gästrum',
        forbidden: [
          'Sova', 'Hem', 'Besök'
        ],
        used: false
      },
      {
      word: 'Balkong',
        forbidden: [
          'Ute', 'Betong', 'Inglasad'
        ],
        used: false
      },
      {
      word: 'Stetoskop',
        forbidden: [
          'Läkare', 'Doktor', 'Lyssna'
        ],
        used: false
      },
      {
      word: 'Isolde',
        forbidden: [
          'Tristan', 'Saga', 'Gammal'
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
