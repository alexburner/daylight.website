interface ActionReduxInit {
  type: '@@redux/INIT'
}

interface ActionSpace {
  type: 'space'
  space: Space
}

interface ActionTime {
  type: 'time'
  ms: number
}

export type Action = ActionReduxInit | ActionSpace | ActionTime

export interface Coord {
  x: number
  y: number
}

export interface Space {
  latitude: number
  longitude: number
}

export interface State {
  space: Space | null
  suns: Suns | null
  now: Time | null
  hours: Time[] | null
  ms: number
}

export type Suns = { [P in keyof SunsRaw]: Time }

export interface SunsRaw {
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

export interface Time {
  ms: number
  angle: number
  coord: Coord
  text: string
}
