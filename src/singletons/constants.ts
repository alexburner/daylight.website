export const WIDTH = 500
export const HEIGHT = 500

export const RADIUS = 180

export const CX = WIDTH / 2
export const CY = HEIGHT / 2

export const MS_HOUR = 60 * 60 * 1000
export const MS_DEG = 24 * MS_HOUR / 360

export const COLOR_FUDGE = 1

export const COLORS = {
  DAYLIGHT: '#fff6ab',
  GOLDEN: '#ffe881',
  HORIZON: '#f57b75',
  CIVIL: '#406db9',
  NAUTICAL: '#0c306d',
  ASTRONOMICAL: '#021940',
  NIGHT: '#000a23',
}

const TXT_LIGHT = 'rgba(0,0,0,0.6)'
const TXT_DARK = 'rgba(255,255,255,0.6)'

export const TXT_COLORS = {
  DAYLIGHT: TXT_LIGHT,
  GOLDEN: TXT_LIGHT,
  HORIZON: TXT_LIGHT,
  CIVIL: TXT_DARK,
  NAUTICAL: TXT_DARK,
  ASTRONOMICAL: TXT_DARK,
  NIGHT: TXT_DARK,
}
