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
const setSpace = (s: Space) => store.dispatch({ type: 'space', space: s })
const setTime = () => store.dispatch({ type: 'time', ms: ms() })

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
)

if (!space) {
  // request user device geolocation if not already set
  getSpace().then(setSpace)
}

// update time every second
setInterval(setTime, 1000)

// shift time with arrow keys
window.addEventListener('keydown', e => {
  // 37 - left
  // 38 - up
  // 39 - right
  // 40 - down
  if (e.which < 37 || e.which > 40) return
  e.preventDefault()
  e.stopPropagation()
  const shift = 1000 * 60 * 60 // 1h
  const factor = e.shiftKey ? 96 : 24
  const direction = e.which === 37 || e.which === 40 ? -1 : 1
  nudge += shift * factor * direction
  setTime()
})
