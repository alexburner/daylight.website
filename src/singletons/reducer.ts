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
import { getNow, getNudgeMs } from '~singletons/times'
import { asserNever } from '~singletons/types'
import { calculateState } from '~singletons/state'
import { setSavedSpace } from './space'
import { lookupCoords } from './lookup'
import { store } from '~main'
import { setSavedPlace } from './place'

export default (state: State, action: Action): State | Loop<State, Action> => {
  switch (action.type) {
    case ActionType.ReduxInit: {
      return state
    }
    case ActionType.Space: {
      // only update if space has changed
      if (_.isEqual(state.space, action.space)) return state
      // side effect alert! so sue me
      setSavedSpace(action.space)
      // side effect 2, double yikes: lookup place if missing
      if (!action.place) {
        lookupCoords(action.space).then((results) => {
          const result = results[0]
          if (result) {
            store.dispatch({
              type: ActionType.Place,
              place: result,
            })
          }
        })
      }
      // space has changed
      return calculateState({
        ms: state.ms,
        space: action.space,
        place: action.place,
        nudge: state.nudge,
      })
    }
    case ActionType.Place: {
      // only update if place has changed
      if (_.isEqual(state.place, action.place)) return state
      // side effect alert! so sue me
      setSavedPlace(action.place)
      // place has changed
      return calculateState({
        ms: state.ms,
        place: action.place,
        nudge: state.nudge,
      })
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
      return calculateState({
        ms: action.ms,
        space: state.space,
        nudge: state.nudge,
      })
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
