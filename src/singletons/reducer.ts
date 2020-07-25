import _ from 'lodash'
import moment from 'moment'
import { Cmd, loop, Loop } from 'redux-loop'

import {
  Action,
  ActionTime,
  ActionType,
  NudgeDirection,
  State,
} from '~singletons/interfaces'
import { getHours, getNow, getNudgeMs, getSuns } from '~singletons/times'
import { asserNever } from '~singletons/types'

export default (state: State, action: Action): State | Loop<State, Action> => {
  switch (action.type) {
    case ActionType.ReduxInit: {
      return state
    }
    case ActionType.Space: {
      // only update if location has changed
      if (_.isEqual(state.space, action.space)) return state
      // location has changed, update both space and time
      const nextState = { ...state, space: action.space }
      return updateTimes(nextState)
    }
    case ActionType.Time: {
      // always update ms, space may need it for setting time
      const nextState = { ...state, ms: action.ms }
      // only do work if we have location
      if (!state.space) return nextState
      // prepare to compare times
      const prevMoment = moment(state.ms)
      const nextMoment = moment(action.ms)
      // don't update if second is the same
      if (nextMoment.isSame(prevMoment, 'second')) return nextState
      if (nextMoment.isSame(prevMoment, 'day') && state.suns) {
        // only second has changed, just update now
        const nextNow = getNow(action.ms, state.suns.solarNoon)
        return { ...nextState, now: nextNow }
      }
      // day has changed, update all the times
      return updateTimes(nextState)
    }
    case ActionType.Nudge: {
      const sign = action.direction === NudgeDirection.Forward ? +1 : -1
      const ms = getNudgeMs(action.duration)
      const nudge = ms * sign
      return loop(
        { ...state, nudge: state.nudge + nudge },
        Cmd.action<ActionTime>({ type: ActionType.Time, ms: state.ms + nudge }),
      )
    }
    default: {
      asserNever(action)
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
