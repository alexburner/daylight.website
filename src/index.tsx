import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from 'src/components/App'
import { Space } from 'src/singletons/interfaces'
import reducer from 'src/singletons/reducer'
import { getSavedSpace, getSpace } from 'src/singletons/space'
import { getInitState } from 'src/singletons/state'

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

let nudge = 0

const ms = () => Date.now() + nudge
const space = getSavedSpace()

const store = createStore(reducer, getInitState(space, ms()))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
)

if (!space) {
  // request user device geolocation if not already set
  getSpace().then((s: Space) => store.dispatch({ type: 'space', space: s }))
}

// update time every second
setInterval(() => store.dispatch({ type: 'time', ms: ms() }), 1000)
