import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, Reducer } from 'redux'
import { install } from 'redux-loop'

import App from 'src/components/App'
import {
  ActionType,
  NudgeDirection,
  NudgeDuration,
  State,
} from 'src/singletons/interfaces'
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

const space = getSavedSpace()
const store = createStore(
  (reducer as any) as Reducer<State>,
  getInitState(Date.now(), space),
  install(),
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
)

if (!space) {
  // request user device geolocation if not already set
  getSpace().then(s => store.dispatch({ type: ActionType.Space, space: s }))
}

// update time every second
setInterval(
  () =>
    store.dispatch({
      type: ActionType.Time,
      ms: Date.now() + store.getState().nudge,
    }),
  1000,
)

// shift time with arrow keys
window.addEventListener('keydown', e => {
  let direction: NudgeDirection
  let duration: NudgeDuration
  switch (e.key) {
    case 'm': {
      direction = NudgeDirection.Forward
      duration = NudgeDuration.Minute
      break
    }
    case 'M': {
      direction = NudgeDirection.Backward
      duration = NudgeDuration.Minute
      break
    }
    case 'h': {
      direction = NudgeDirection.Forward
      duration = NudgeDuration.Hour
      break
    }
    case 'H': {
      direction = NudgeDirection.Backward
      duration = NudgeDuration.Hour
      break
    }
    case 'd': {
      direction = NudgeDirection.Forward
      duration = NudgeDuration.Day
      break
    }
    case 'D': {
      direction = NudgeDirection.Backward
      duration = NudgeDuration.Day
      break
    }
    case 'w': {
      direction = NudgeDirection.Forward
      duration = NudgeDuration.Week
      break
    }
    case 'W': {
      direction = NudgeDirection.Backward
      duration = NudgeDuration.Week
      break
    }
    default: {
      return
    }
  }
  e.preventDefault()
  e.stopPropagation()
  store.dispatch({ type: ActionType.Nudge, direction, duration })
})
