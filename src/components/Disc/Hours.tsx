import * as _ from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'

import { COLOR_FUDGE, RADIUS } from 'src/singletons/constants'
import { Point, State, Suns, Time } from 'src/singletons/interfaces'

interface Props {
  hours?: Time[]
  suns?: Suns
}

const CAP_FUDGE = COLOR_FUDGE / 2

const PADDING = 6
const SEGMENT = 6

const Hours = ({ hours, suns }: Props): JSX.Element => {
  if (!hours || !suns) return <g />
  return (
    <g style={{ opacity: 0.4 }}>
      <defs>
        <clipPath id="clip-cap-day">
          {getDayPath({
            left: {
              x: suns.sunriseEnd.point.x,
              y: suns.sunriseEnd.point.y - CAP_FUDGE,
            },
            right: {
              x: suns.sunsetStart.point.x,
              y: suns.sunsetStart.point.y - CAP_FUDGE,
            },
            radius: RADIUS,
            sweep: '1 1',
          })}
        </clipPath>
        <clipPath id="clip-cap-night">
          {getNightPath({
            left: {
              x: suns.sunrise.point.x,
              y: suns.sunrise.point.y - CAP_FUDGE,
            },
            right: {
              x: suns.sunset.point.x,
              y: suns.sunset.point.y - CAP_FUDGE,
            },
            radius: RADIUS,
            sweep: '0 0',
          })}
        </clipPath>
      </defs>
      {_.map(hours, ({ angle, point, text }: Time) => (
        <g key={text} transform={`rotate(${angle} ${point.x} ${point.y})`}>
          <text
            x={point.x + PADDING + 1 + SEGMENT + PADDING - 1}
            y={point.y}
            dominantBaseline="middle"
            style={{
              fill: '#000',
              fontSize: '12px',
            }}
          >
            {text}
          </text>
          <line
            x1={point.x + PADDING + 1}
            y1={point.y}
            x2={point.x + PADDING + 1 + SEGMENT}
            y2={point.y}
            style={{
              stroke: '#000',
              strokeWidth: 1,
            }}
          />
        </g>
      ))}
      <line
        clipPath="url(#clip-cap-day)"
        x1={hours[0].point.x}
        y1={hours[0].point.y}
        x2={hours[12].point.x}
        y2={hours[12].point.y}
        strokeDasharray="4, 4"
        style={{
          opacity: 0.5,
          stroke: '#000',
          strokeWidth: 1,
        }}
      />
      <line
        clipPath="url(#clip-cap-night)"
        x1={hours[0].point.x}
        y1={hours[0].point.y}
        x2={hours[12].point.x}
        y2={hours[12].point.y}
        strokeDasharray="4, 4"
        style={{
          opacity: 0.9,
          stroke: '#FFF',
          strokeWidth: 1,
        }}
      />
    </g>
  )
}

const mapStateToProps = ({ hours, suns }: State): Props => ({ hours, suns })

export default connect(mapStateToProps)(Hours)

const getDayPath = ({
  left,
  right,
  radius,
  sweep,
}: {
  left: Point
  right: Point
  radius: number
  sweep: string
}): JSX.Element => (
  <path
    d={`
      M ${left.x} ${left.y}
      A ${radius} ${radius} 0 1 1 ${right.x} ${right.y}
      Z
    `}
  />
)

const getNightPath = ({
  left,
  right,
  radius,
  sweep,
}: {
  left: Point
  right: Point
  radius: number
  sweep: string
}): JSX.Element => (
  <path
    d={`
      M ${left.x} ${left.y}
      A ${radius} ${radius} 0 1 0 ${right.x} ${right.y}
      Z
    `}
  />
)
