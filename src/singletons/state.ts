import { Place, Space, State } from '~singletons/interfaces'
import {
  getHours,
  getNow,
  getSuns,
  getRealSunTimes,
  checkIfDay,
} from '~singletons/times'

export const calculateState = (args: {
  ms: number
  space?: Space
  place?: Place
  nudge?: number
}): State => {
  const ms = args.ms
  const space = args.space
  const place = args.place
  const nudge = args.nudge || 0
  const suns = args.space ? getSuns(args.ms, args.space) : undefined
  const now = suns ? getNow(args.ms, suns.solarNoon) : undefined
  const hours = suns ? getHours(suns.solarNoon) : undefined
  const realSuns = suns ? getRealSunTimes(suns) : undefined
  const isDay = space && !realSuns?.length ? checkIfDay(ms, space) : undefined
  return { space, place, suns, now, hours, ms, nudge, realSuns, isDay }
}
