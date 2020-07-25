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
  point: Point
  text: string
}
