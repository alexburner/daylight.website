import { Space, State } from 'src/singletons/interfaces'
import { getHours, getNow, getSuns } from 'src/singletons/times'

export const getInitState = (ms: number, space?: Space): State => {
  const suns = space ? getSuns(ms, space) : undefined
  const now = suns ? getNow(ms, suns.solarNoon) : undefined
  const hours = suns ? getHours(suns.solarNoon) : undefined
  const nudge = 0
  return { space, suns, now, hours, ms, nudge }
}
