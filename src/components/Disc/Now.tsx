import * as _ from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'

import { State, Time } from 'src/singletons/interfaces'

interface Props {
  now: Time | null
}

const PADDING = -3
const SEGMENT = 8
const HALFHEIGHT = SEGMENT / 2 + 4
const LENGTH = 48

const Now = ({ now }: Props): JSX.Element => {
  if (!now) return <g />
  const { angle, coord, text } = now
  return (
    <g transform={`rotate(${angle} ${coord.x} ${coord.y})`}>
      <polygon
        style={{ fill: '#444' }}
        points={`
            ${coord.x + PADDING} ${coord.y},
            ${coord.x + PADDING + SEGMENT} ${coord.y + HALFHEIGHT},
            ${coord.x + PADDING + SEGMENT + LENGTH} ${coord.y + HALFHEIGHT},
            ${coord.x + PADDING + SEGMENT + LENGTH} ${coord.y - HALFHEIGHT},
            ${coord.x + PADDING + SEGMENT} ${coord.y - HALFHEIGHT}
          `}
      />
      <text
        x={coord.x + PADDING + SEGMENT + 14}
        y={coord.y}
        baselineShift="-28%"
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
