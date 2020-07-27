import React from 'react'
import { connect } from 'react-redux'

import {
  COLOR_FUDGE,
  CX,
  CY,
  RADIUS,
  getColorFromKey,
} from '~singletons/constants'
import { Point, State, Suns } from '~singletons/interfaces'
import { getRealSunTimes } from '~singletons/times'

interface Props {
  suns?: Suns
}

const Colors = ({ suns }: Props): JSX.Element => {
  if (!suns) return <g />

  const times = getRealSunTimes(suns)
  if (!times.length) return <g />

  const topCap = getTopCap({
    left: times[times.length / 2 - 1].point,
    right: times[times.length / 2].point,
    color: getColorFromKey(times[times.length / 2 - 1].key),
  })

  const segments: JSX.Element[] = []
  for (let i = 0, l = times.length / 2 - 1; i < l; i++) {
    const ll = i
    const ul = i + 1
    const lr = times.length - 1 - i
    const ur = times.length - 2 - i
    segments.push(
      getSegment({
        ul: times[ul].point,
        ur: times[ur].point,
        ll: times[ll].point,
        lr: times[lr].point,
        color: getColorFromKey(times[ll].key),
      }),
    )
  }

  const bottomCap = getBottomCap({
    left: times[0].point,
    right: times[times.length - 1].point,
    color: getColorFromKey(times[times.length - 1].key),
  })

  return (
    <g>
      <defs>
        <clipPath id="clip-disc">
          <circle cx={CX} cy={CY} r={RADIUS} />
        </clipPath>
      </defs>
      <g clipPath="url(#clip-disc)" style={{ opacity: 0.94 }}>
        {[topCap, ...segments, bottomCap]}
      </g>
    </g>
  )
}

const mapStateToProps = ({ suns }: State): Props => ({ suns })

export default connect(mapStateToProps)(Colors)

const getPath = (color: string, d: string): JSX.Element => (
  <path
    key={d}
    d={d}
    style={{ fill: color, stroke: color, strokeWidth: COLOR_FUDGE }}
  />
)

const getSegment = ({
  ul,
  ur,
  ll,
  lr,
  color,
}: {
  ul: Point
  ur: Point
  ll: Point
  lr: Point
  color: string
}): JSX.Element =>
  getPath(
    color,
    `
    M ${ul.x} ${ul.y}
    A ${RADIUS} ${RADIUS} 0 0 0 ${ll.x} ${ll.y}
    L ${lr.x} ${lr.y}
    A ${RADIUS} ${RADIUS} 0 0 0 ${ur.x} ${ur.y}
    Z
    `,
  )

const getTopCap = ({
  left,
  right,
  color,
}: {
  left: Point
  right: Point
  color: string
}): JSX.Element =>
  getPath(
    color,
    `
    M ${left.x} ${left.y}
    A ${RADIUS} ${RADIUS} 0 1 1 ${right.x} ${right.y}
    Z
    `,
  )

const getBottomCap = ({
  left,
  right,
  color,
}: {
  left: Point
  right: Point
  color: string
}): JSX.Element =>
  getPath(
    color,
    `
    M ${left.x} ${left.y}
    A ${RADIUS} ${RADIUS} 0 1 0 ${right.x} ${right.y}
    Z
    `,
  )
