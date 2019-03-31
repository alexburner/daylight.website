import * as _ from 'lodash'
import * as moment from 'moment'
import { getTimes } from 'suncalc'

import { CX, CY, MS_DEG, MS_HOUR, RADIUS } from 'src/singletons/constants'
import {
  NudgeDuration,
  Point,
  Space,
  Suns,
  SunsRaw,
  Time,
} from 'src/singletons/interfaces'
import { asserNever } from 'src/singletons/types'

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
      const text = moment(date).format('h:mma')
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

export const getNudgeMs = (duration: NudgeDuration): number => {
  switch (duration) {
    case NudgeDuration.Minute: {
      return 1000 * 60
    }
    case NudgeDuration.Hour: {
      return 1000 * 60 * 60
    }
    case NudgeDuration.Day: {
      return 1000 * 60 * 60 * 24
    }
    case NudgeDuration.Week: {
      return 1000 * 60 * 60 * 24 * 7
    }
    default: {
      asserNever(duration)
      return 0
    }
  }
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
