import * as React from 'react'
import { connect } from 'react-redux'

import { COLOR_FUDGE, COLORS, CX, CY, RADIUS } from 'src/singletons/constants'
import { Point, State, Suns } from 'src/singletons/interfaces'

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
            left: suns.goldenHourEnd.point,
            right: suns.goldenHour.point,
            color: COLORS.DAYLIGHT,
            radius: RADIUS,
          }),
          getSegment({
            // golden hour
            ul: suns.goldenHourEnd.point,
            ur: suns.goldenHour.point,
            ll: suns.sunriseEnd.point,
            lr: suns.sunsetStart.point,
            color: COLORS.GOLDEN,
            radius: RADIUS,
          }),
          getSegment({
            // sunrise/sunset
            ul: suns.sunriseEnd.point,
            ur: suns.sunsetStart.point,
            ll: suns.sunrise.point,
            lr: suns.sunset.point,
            color: COLORS.HORIZON,
            radius: RADIUS,
          }),
          getSegment({
            // civil twilight
            ul: suns.sunrise.point,
            ur: suns.sunset.point,
            ll: suns.dawn.point,
            lr: suns.dusk.point,
            color: COLORS.CIVIL,
            radius: RADIUS,
          }),
          getSegment({
            // nauticaul twilight
            ul: suns.dawn.point,
            ur: suns.dusk.point,
            ll: suns.nauticalDawn.point,
            lr: suns.nauticalDusk.point,
            color: COLORS.NAUTICAL,
            radius: RADIUS,
          }),
          getSegment({
            // astronomical twilight
            ul: suns.nauticalDawn.point,
            ur: suns.nauticalDusk.point,
            ll: suns.nightEnd.point,
            lr: suns.night.point,
            color: COLORS.ASTRONOMICAL,
            radius: RADIUS,
          }),
          getBottomCap({
            // night
            left: suns.night.point,
            right: suns.nightEnd.point,
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
  ul: Point
  ur: Point
  ll: Point
  lr: Point
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
  left: Point
  right: Point
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
  left: Point
  right: Point
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
