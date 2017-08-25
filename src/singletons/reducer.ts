import * as _ from 'lodash'
import * as moment from 'moment'

import { Action, State } from 'src/singletons/interfaces'
import { getHours, getNow, getSuns } from 'src/singletons/times'

export default (state: State, action: Action): State => {
  switch (action.type) {
    case '@@redux/INIT': {
      return state
    }
    case 'space': {
      // only update if location has changed
      if (_.isEqual(state.space, action.space)) return state
      // location has changed, update both space and time
      const newState = { ...state, space: action.space }
      return updateTimes(newState)
    }
    case 'time': {
      // always update ms, space may need it for setting time
      const newState = { ...state, ms: action.ms }
      // only do work if we have location
      if (!state.space) return newState
      // prepare to compare times
      const currMoment = moment(action.ms)
      const prevMoment = moment(state.ms)
      // don't update if second is the same
      if (currMoment.isSame(prevMoment, 'second')) return newState
      if (currMoment.isSame(prevMoment, 'day') && state.suns) {
        // only second has changed, just update now
        const newNow = getNow(action.ms, state.suns.solarNoon)
        return { ...newState, now: newNow }
      }
      // day has changed, update all the times
      return updateTimes(newState)
    }
    default: {
      console.warn('Unhandled action:', action)
      return state
    }
  }
}

const updateTimes = (state: State): State => {
  if (!state.space) return state // XXX: ts bug, unreachable condition
  const suns = getSuns(state.ms, state.space)
  const now = getNow(state.ms, suns.solarNoon)
  const hours = getHours(suns.solarNoon)
  return { ...state, suns, now, hours }
}
