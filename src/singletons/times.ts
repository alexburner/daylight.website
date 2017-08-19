import * as _ from 'lodash'
import * as moment from 'moment'
import * as suncalc from 'suncalc'

import { CX, CY, MS_DEG, MS_HOUR, RADIUS } from 'src/singletons/constants'
import { Coord, Space, Suns, SunsRaw, Time } from 'src/singletons/interfaces'

export const getSuns = (nowMs: number, space: Space): Suns => {
  const sunsRaw: SunsRaw = suncalc.getTimes(
    new Date(nowMs),
    space.latitude,
    space.longitude,
  )
  const zeroMs = sunsRaw.solarNoon.getTime()
  return _.reduce(
    sunsRaw,
    (suns: Suns, date: Date, key: string) => {
      const ms = date.getTime()
      const angle = getTimeAngle(ms, zeroMs)
      const coord = getCircleCoord(angle)
      const text = moment(date).format('h:mma')
      const time: Time = { ms, angle, coord, text }
      suns[key] = time
      return suns
    },
    {},
  )
}

export const getNow = (ms: number, solarNoon: Time): Time => {
  const angle = getTimeAngle(ms, solarNoon.ms)
  const coord = getCircleCoord(angle)
  // const text = moment(ms).format('h : mm')
  const text = 'now'
  return { ms, angle, coord, text }
}

export const getHours = (solarNoon: Time): Time[] => {
  const noonDate = new Date(solarNoon.ms)
  const startMs = new Date(
    noonDate.getFullYear(),
    noonDate.getMonth(),
    noonDate.getDate(),
    0, // hours
    0, // minutes
    0, // seconds
  ).getTime()
  return _.times(24, (hour: number) => {
    const ms = startMs + hour * MS_HOUR
    const angle = getTimeAngle(ms, solarNoon.ms)
    const coord = getCircleCoord(angle)
    const text = moment({ hour }).format('ha')
    const time: Time = { ms, angle, coord, text }
    return time
  })
}

const getTimeAngle = (time: number, zeroTime: number): number => {
  const diff = time - zeroTime
  const angle = diff / MS_DEG
  return angle - 90
}

const getCircleCoord = (angle: number): Coord =>
  rotateCoord({
    coord: { x: CX + RADIUS, y: CY },
    origin: { x: CX, y: CY },
    angle,
  })

const rotateCoord = ({
  coord,
  origin,
  angle,
}: {
  coord: Coord
  origin: Coord
  angle: number
}): Coord => {
  const radians = -(Math.PI / 180) * angle
  const cos = Math.cos(radians)
  const sin = Math.sin(radians)
  return {
    x: cos * (coord.x - origin.x) + sin * (coord.y - origin.y) + origin.x,
    y: cos * (coord.y - origin.y) - sin * (coord.x - origin.x) + origin.y,
  }
}
