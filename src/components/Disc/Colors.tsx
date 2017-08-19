import * as React from 'react'
import { connect } from 'react-redux'

import { COLOR_FUDGE, COLORS, CX, CY, RADIUS } from 'src/singletons/constants'
import { Coord, State, Suns } from 'src/singletons/interfaces'

interface Props {
  suns: Suns | null
}

const Colors = ({ suns }: Props): JSX.Element => {
  if (!suns) return <g />
  return (
    <g>
      <defs>
        <clipPath id="clip-disc">
          <circle cx={CX} cy={CY} r={RADIUS} />
        </clipPath>
      </defs>
      <g clipPath="url(#clip-disc)" style={{ opacity: 0.94 }}>
        {[
          getTopCap({
            // daylight
            left: suns.goldenHourEnd.coord,
            right: suns.goldenHour.coord,
            color: COLORS.DAYLIGHT,
            radius: RADIUS,
          }),
          getSegment({
            // golden hour
            ul: suns.goldenHourEnd.coord,
            ur: suns.goldenHour.coord,
            ll: suns.sunriseEnd.coord,
            lr: suns.sunsetStart.coord,
            color: COLORS.GOLDEN,
            radius: RADIUS,
          }),
          getSegment({
            // sunrise/sunset
            ul: suns.sunriseEnd.coord,
            ur: suns.sunsetStart.coord,
            ll: suns.sunrise.coord,
            lr: suns.sunset.coord,
            color: COLORS.HORIZON,
            radius: RADIUS,
          }),
          getSegment({
            // civil twilight
            ul: suns.sunrise.coord,
            ur: suns.sunset.coord,
            ll: suns.dawn.coord,
            lr: suns.dusk.coord,
            color: COLORS.CIVIL,
            radius: RADIUS,
          }),
          getSegment({
            // nauticaul twilight
            ul: suns.dawn.coord,
            ur: suns.dusk.coord,
            ll: suns.nauticalDawn.coord,
            lr: suns.nauticalDusk.coord,
            color: COLORS.NAUTICAL,
            radius: RADIUS,
          }),
          getSegment({
            // astronomical twilight
            ul: suns.nauticalDawn.coord,
            ur: suns.nauticalDusk.coord,
            ll: suns.nightEnd.coord,
            lr: suns.night.coord,
            color: COLORS.ASTRONOMICAL,
            radius: RADIUS,
          }),
          getBottomCap({
            // night
            left: suns.night.coord,
            right: suns.nightEnd.coord,
            color: COLORS.NIGHT,
            radius: RADIUS,
          }),
        ]}
      </g>
    </g>
  )
}

const mapStateToProps = ({ suns }: State): Props => ({ suns })

export default connect(mapStateToProps)(Colors)

const getPath = (color: string, d: string): JSX.Element =>
  <path
    key={d}
    d={d}
    style={{ fill: color, stroke: color, strokeWidth: COLOR_FUDGE }}
  />

const getSegment = ({
  ul,
  ur,
  ll,
  lr,
  radius,
  color,
}: {
  ul: Coord
  ur: Coord
  ll: Coord
  lr: Coord
  color: string
  radius: number
}): JSX.Element =>
  getPath(
    color,
    `
    M ${ul.x} ${ul.y}
    A ${radius} ${radius} 0 0 0 ${ll.x} ${ll.y}
    L ${lr.x} ${lr.y}
    A ${radius} ${radius} 0 0 0 ${ur.x} ${ur.y}
    Z
`,
  )

const getTopCap = ({
  left,
  right,
  radius,
  color,
}: {
  left: Coord
  right: Coord
  color: string
  radius: number
}): JSX.Element =>
  getPath(
    color,
    `
    M ${left.x} ${left.y}
    A ${radius} ${radius} 0 1 1 ${right.x} ${right.y}
    Z
`,
  )

const getBottomCap = ({
  left,
  right,
  radius,
  color,
}: {
  left: Coord
  right: Coord
  color: string
  radius: number
}): JSX.Element =>
  getPath(
    color,
    `
    M ${right.x} ${right.y}
    A ${radius} ${radius} 0 0 0 ${left.x} ${left.y}
    Z
`,
  )
