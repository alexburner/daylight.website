export interface Point {
  x: number
  y: number
}

export interface SunCalcs {
  sunrise: Date
  sunriseEnd: Date
  goldenHourEnd: Date
  solarNoon: Date
  goldenHour: Date
  sunsetStart: Date
  sunset: Date
  dusk: Date
  nauticalDusk: Date
  night: Date
  nadir: Date
  nightEnd: Date
  nauticalDawn: Date
  dawn: Date
}

export type SunMoment = {
  date: Date
  time: number
  angle: number
  point: Point
}

export type SunDict = { [P in keyof SunCalcs]: SunMoment }

export interface Moment {
  angle: number
  point: Point
  text: string
}
