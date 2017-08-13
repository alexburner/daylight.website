import * as _ from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'

import { State, Time } from 'src/singletons/interfaces'

interface Props {
  hours: Time[] | null
}

const PADDING = 6
const SEGMENT = 6

const Hours = ({ hours }: Props): JSX.Element => {
  if (!hours) return <g />
  return (
    <g style={{ opacity: 0.4 }}>
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

const mapStateToProps = ({ hours }: State): Props => ({ hours })

export default connect(mapStateToProps)(Hours)
