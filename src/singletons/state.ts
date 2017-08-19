import { Space, State } from 'src/singletons/interfaces'
import { getHours, getNow, getSuns } from 'src/singletons/times'

export const getInitState = (space: Space | null, ms: number): State => {
  const suns = space ? getSuns(ms, space) : null
  const now = suns ? getNow(ms, suns.solarNoon) : null
  const hours = suns ? getHours(suns.solarNoon) : null
  return { space, suns, now, hours, ms }
}
