import React from 'react'
import { connect } from 'react-redux'

import {
  COLOR_FUDGE,
  CX,
  CY,
  RADIUS,
  getColorFromKey,
  COLORS,
} from '~singletons/constants'
import { Point, State, Time } from '~singletons/interfaces'

interface Props {
  realSuns?: Time[]
  isDay?: boolean
}

const Colors = ({ realSuns, isDay }: Props): JSX.Element => {
  if (!realSuns) return <g />
  if (!realSuns.length) {
    const color = isDay ? COLORS.DAYLIGHT : COLORS.NIGHT
    return (
      <g style={{ opacity: 0.94 }}>
        <circle
          cx={CX}
          cy={CY}
          r={RADIUS}
          style={{ fill: color, stroke: color, strokeWidth: COLOR_FUDGE }}
        />
      </g>
    )
  }

  const topCap = getTopCap({
    left: realSuns[realSuns.length / 2 - 1].point,
    right: realSuns[realSuns.length / 2].point,
    color: getColorFromKey(realSuns[realSuns.length / 2 - 1].key),
  })

  const segments: JSX.Element[] = []
  for (let i = 0, l = realSuns.length / 2 - 1; i < l; i++) {
    const ll = i
    const ul = i + 1
    const lr = realSuns.length - 1 - i
    const ur = realSuns.length - 2 - i
    segments.push(
      getSegment({
        ul: realSuns[ul].point,
        ur: realSuns[ur].point,
        ll: realSuns[ll].point,
        lr: realSuns[lr].point,
        color: getColorFromKey(realSuns[ll].key),
      }),
    )
  }

  const bottomCap = getBottomCap({
    left: realSuns[0].point,
    right: realSuns[realSuns.length - 1].point,
    color: getColorFromKey(realSuns[realSuns.length - 1].key),
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

const mapStateToProps = ({ realSuns, isDay }: State): Props => ({
  realSuns,
  isDay,
})

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
