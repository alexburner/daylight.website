import * as _ from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'

import { COLOR_FUDGE, RADIUS } from 'src/singletons/constants'
import { Coord, State, Suns, Time } from 'src/singletons/interfaces'

interface Props {
  hours: Time[] | null
  suns: Suns | null
}

const CAP_FUDGE = COLOR_FUDGE / 2

const PADDING = 6
const SEGMENT = 6

const Hours = ({ hours, suns }: Props): JSX.Element => {
  if (!hours || !suns) return <g />
  const from = {
    x: suns.sunrise.coord.x,
    y: suns.sunrise.coord.y - CAP_FUDGE,
  }
  const to = {
    x: suns.sunset.coord.x,
    y: suns.sunset.coord.y - CAP_FUDGE,
  }
  const radius = RADIUS
  return (
    <g style={{ opacity: 0.4 }}>
      <defs>
        <clipPath id="clip-cap-day">
          {getCapPath({ from, to, radius, sweep: '1 1' })}
        </clipPath>
        <clipPath id="clip-cap-night">
          {getCapPath({ from, to, radius, sweep: '0 0' })}
        </clipPath>
      </defs>
      {_.map(hours, ({ angle, coord, text }: Time) =>
        <g key={text} transform={`rotate(${angle} ${coord.x} ${coord.y})`}>
          <text
            x={coord.x + PADDING + 1 + SEGMENT + PADDING - 1}
            y={coord.y}
            dominantBaseline="middle"
            style={{
              fill: '#000',
              fontSize: '12px',
            }}
          >
            {text}
          </text>
          <line
            x1={coord.x + PADDING + 1}
            y1={coord.y}
            x2={coord.x + PADDING + 1 + SEGMENT}
            y2={coord.y}
            style={{
              stroke: '#000',
              strokeWidth: 1,
            }}
          />
        </g>,
      )}
      <line
        clipPath="url(#clip-cap-day)"
        x1={hours[0].coord.x}
        y1={hours[0].coord.y}
        x2={hours[12].coord.x}
        y2={hours[12].coord.y}
        strokeDasharray="4, 4"
        style={{
          opacity: 0.5,
          stroke: '#000',
          strokeWidth: 1,
        }}
      />
      <line
        clipPath="url(#clip-cap-night)"
        x1={hours[0].coord.x}
        y1={hours[0].coord.y}
        x2={hours[12].coord.x}
        y2={hours[12].coord.y}
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

const getCapPath = ({
  from,
  to,
  radius,
  sweep,
}: {
  from: Coord
  to: Coord
  radius: number
  sweep: string
}): JSX.Element =>
  <path
    d={`
        M ${from.x} ${from.y}
        A ${radius} ${radius} 0 ${sweep} ${to.x} ${to.y}
        Z
    `}
  />
