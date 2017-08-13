import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { getInitState } from 'src/singletons/state'
import { getSavedSpace, getSpace } from 'src/singletons/space'
import { Space } from 'src/singletons/interfaces'
import App from 'src/components/App'
import reducer from 'src/singletons/reducer'

{
  // TODO TEMP
  // allow flushing cached position with #reset hash
  const hash = window.location.hash
  const RESET = '#reset'
  if (hash === RESET) {
    window.localStorage.removeItem('position')
    window.location.href = window.location.href.slice(0, -RESET.length)
  }
}

const ms = Date.now()
const space = getSavedSpace()

const store = createStore(reducer, getInitState(space, ms))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
)

if (!space) {
  // request user device geolocation if not already set
  getSpace().then((space: Space) => store.dispatch({ type: 'space', space }))
}

// update time every second
setInterval(() => store.dispatch({ type: 'time', ms: Date.now() }), 1000)
