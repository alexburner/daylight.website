export const enum NudgeDirection {
  Forward = 'Forward',
  Backward = 'Backward',
}

export const enum NudgeDuration {
  Minute = 'Minute',
  Hour = 'Hour',
  Day = 'Day',
  Week = 'Week',
}

export const enum ActionType {
  ReduxInit = '@@redux/INIT',
  Space = 'Space',
  Time = 'Time',
  Nudge = 'Nudge',
}

interface ActionReduxInit {
  type: ActionType.ReduxInit
}

interface ActionSpace {
  type: ActionType.Space
  space: Space
}

export interface ActionTime {
  type: ActionType.Time
  ms: number
}

interface ActionNudge {
  type: ActionType.Nudge
  direction: NudgeDirection
  duration: NudgeDuration
}

export type Action = ActionReduxInit | ActionSpace | ActionTime | ActionNudge

export interface Point {
  x: number
  y: number
}

export interface Space {
  latitude: number
  longitude: number
}

export interface State {
  space?: Space
  suns?: Suns
  now?: Time
  hours?: Time[]
  ms: number
  nudge: number
  realSuns?: Time[]
  isDay?: boolean
}

export type Suns = { [P in keyof SunsRaw]: Time }

export interface SunsRaw {
  /**
   * sunrise (top edge of the sun appears on the horizon)
   */
  sunrise: Date
  /**
   * sunrise ends (bottom edge of the sun touches the horizon)
   */
  sunriseEnd: Date
  /**
   * morning golden hour (soft light, best time for photography) ends
   */
  goldenHourEnd: Date
  /**
   * solar noon (sun is in the highest position)
   */
  solarNoon: Date
  /**
   * evening golden hour starts
   */
  goldenHour: Date
  /**
   * sunset starts (bottom edge of the sun touches the horizon)
   */
  sunsetStart: Date
  /**
   * sunset (sun disappears below the horizon, evening civil twilight starts)
   */
  sunset: Date
  /**
   * dusk (evening nautical twilight starts)
   */
  dusk: Date
  /**
   * nautical dusk (evening astronomical twilight starts)
   */
  nauticalDusk: Date
  /**
   * night starts (dark enough for astronomical observations)
   */
  night: Date
  /**
   * nadir (darkest moment of the night, sun is in the lowest position)
   */
  nadir: Date
  /**
   * night ends (morning astronomical twilight starts)
   */
  nightEnd: Date
  /**
   * nautical dawn (morning nautical twilight starts)
   */
  nauticalDawn: Date
  /**
   * dawn (morning nautical twilight ends, morning civil twilight starts)
   */
  dawn: Date
}

export interface Time {
  ms: number
  angle: number
  point: Point
  text: string
  key: keyof Suns | 'now' | 'hour'
}
