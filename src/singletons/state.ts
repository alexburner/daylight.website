import { MS_HOUR } from 'src/singletons/constants'
import { getNow, getSuns, getHours } from 'src/singletons/times'
import { Space, State } from 'src/singletons/interfaces'

export const getInitState = (space: Space | null, ms: number): State => {
  const suns = space ? getSuns(ms, space) : null
  const now = suns ? getNow(ms, suns.solarNoon) : null
  const hours = suns ? getHours(ms, suns.solarNoon) : null
  return { space, suns, now, hours, ms }
}
