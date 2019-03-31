import * as _ from 'lodash'
import * as moment from 'moment'
import { getTimes } from 'suncalc'

import { CX, CY, MS_DEG, MS_HOUR, RADIUS } from 'src/singletons/constants'
import { Point, Space, Suns, SunsRaw, Time } from 'src/singletons/interfaces'

export const getSuns = (nowMs: number, space: Space): Suns => {
  const safeDate = new Date(nowMs)
  safeDate.setHours(12) // ensure SunCalc identifies correct day
  const sunsRaw = getTimes(safeDate, space.latitude, space.longitude)
  const zeroMs = sunsRaw.solarNoon.getTime()
  return _.reduce(
    sunsRaw,
    (suns: Suns, date: Date, key: string) => {
      const ms = date.getTime()
      const angle = getTimeAngle(ms, zeroMs)
      const point = getCirclePoint(angle)
      const text = moment(date)
        .format('h:mma')
        .slice(0, -1)
      const time: Time = { ms, angle, point, text }
      suns[key as keyof SunsRaw] = time
      return suns
    },
    {} as Suns,
  ) as Suns
}

export const getNow = (ms: number, solarNoon: Time): Time => {
  const angle = getTimeAngle(ms, solarNoon.ms)
  const point = getCirclePoint(angle)
  // const text = moment(ms).format('h : mm')
  const text = 'now'
  return { ms, angle, point, text }
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
    const point = getCirclePoint(angle)
    const text = moment({ hour }).format('ha')
    const time: Time = { ms, angle, point, text }
    return time
  })
}

const getTimeAngle = (time: number, zeroTime: number): number => {
  const diff = time - zeroTime
  const angle = diff / MS_DEG
  return angle - 90
}

const getCirclePoint = (angle: number): Point =>
  rotatePoint({
    point: { x: CX + RADIUS, y: CY },
    origin: { x: CX, y: CY },
    angle,
  })

const rotatePoint = ({
  point,
  origin,
  angle,
}: {
  point: Point
  origin: Point
  angle: number
}): Point => {
  const radians = -(Math.PI / 180) * angle
  const cos = Math.cos(radians)
  const sin = Math.sin(radians)
  const x = origin.x + cos * (point.x - origin.x) + sin * (point.y - origin.y)
  const y = origin.y + cos * (point.y - origin.y) - sin * (point.x - origin.x)
  return { x, y }
}
