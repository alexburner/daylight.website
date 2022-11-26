import React from 'react'
import { connect } from 'react-redux'

import { State, Time } from '~singletons/interfaces'

interface Props {
  now?: Time
}

const PADDING = -3
const SEGMENT = 8
const HALFHEIGHT = SEGMENT / 2 + 4
const LENGTH = 48

const Now = ({ now }: Props): JSX.Element => {
  if (!now) return <g />
  const { angle, point, text } = now
  return (
    <g transform={`rotate(${angle} ${point.x} ${point.y})`}>
      <polygon
        style={{ fill: '#313131' }}
        points={`
            ${point.x + PADDING} ${point.y},
            ${point.x + PADDING + SEGMENT} ${point.y + HALFHEIGHT},
            ${point.x + PADDING + SEGMENT + LENGTH} ${point.y + HALFHEIGHT},
            ${point.x + PADDING + SEGMENT + LENGTH} ${point.y - HALFHEIGHT},
            ${point.x + PADDING + SEGMENT} ${point.y - HALFHEIGHT}
          `}
      />
      <text
        x={point.x + PADDING + SEGMENT + LENGTH / 2}
        y={point.y}
        dominantBaseline="middle"
        textAnchor="middle"
        style={{
          fill: '#FFF',
          fontSize: '11px',
          opacity: 0.9,
        }}
      >
        {text}
      </text>
    </g>
  )
}

const mapStateToProps = ({ now }: State): Props => ({ now })

export default connect(mapStateToProps)(Now)
