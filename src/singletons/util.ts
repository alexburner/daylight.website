import * as _ from 'lodash'
import {
  CX,
  CY,
  RADIUS,
  MS_PER_DEG,
  HOUR_NAMES,
} from 'src/singletons/constants'
import {
  Moment,
  Point,
  SunCalcs,
  SunDict,
  SunMoment,
} from 'src/singletons/interfaces'

export const getSunDict = (sunCalcs: SunCalcs): SunDict => {
  const zenithTime = sunCalcs.solarNoon.getTime()
  return _.reduce(
    sunCalcs,
    (dict: SunDict, date: Date, key: string) => {
      const time = date.getTime()
      const angle = getTimeAngle(time, zenithTime)
      const point = getCirclePoint(angle)
      const moment: SunMoment = { date, time, angle, point }
      dict[key] = moment
      return dict
    },
    {},
  )
}

export const getHours = (zenithDate: Date, zenithTime: number): Moment[] => {
  const startDate = new Date(
    zenithDate.getFullYear(),
    zenithDate.getMonth(),
    zenithDate.getDate(),
    0, // hours
    0, // minutes
    0, // seconds
  )
  const startTime = startDate.getTime()
  return _.map(HOUR_NAMES, (text: string, i: number) => {
    const time = startTime + i * 60 * 60 * 1000
    const angle = getTimeAngle(time, zenithTime)
    const point = getCirclePoint(angle)
    const moment: Moment = { angle, point, text }
    return moment
  })
}

export const getTimeAngle = (time: number, zeroTime: number): number => {
  const diff = time - zeroTime
  const angle = diff / MS_PER_DEG
  return angle - 90
}

export const getCirclePoint = (angle: number): Point =>
  rotatePoint({
    point: { x: CX + RADIUS, y: CY },
    origin: { x: CX, y: CY },
    angle,
  })

export const rotatePoint = ({
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
  return {
    x: cos * (point.x - origin.x) + sin * (point.y - origin.y) + origin.x,
    y: cos * (point.y - origin.y) - sin * (point.x - origin.x) + origin.y,
  }
}
