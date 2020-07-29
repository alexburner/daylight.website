import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'

import { State, Suns, Time } from '~singletons/interfaces'

interface Props {
  hours?: Time[]
  suns?: Suns
}

const PADDING = 6
const SEGMENT = 6

const Hours = ({ hours, suns }: Props): JSX.Element => {
  if (!hours || !suns) return <g />
  return (
    <g style={{ opacity: 0.4 }}>
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
    </g>
  )
}

const mapStateToProps = ({ hours, suns }: State): Props => ({ hours, suns })

export default connect(mapStateToProps)(Hours)
