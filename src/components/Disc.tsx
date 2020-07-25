import React from 'react'
import { connect } from 'react-redux'

import Colors from '~components/Disc/Colors'
import Hours from '~components/Disc/Hours'
import Now from '~components/Disc/Now'
import { CX, CY, HEIGHT, WIDTH } from '~singletons/constants'
import { State, Suns, Time } from '~singletons/interfaces'

interface Props {
  suns?: Suns
  hours?: Time[]
}

const Disc = ({ suns, hours }: Props): JSX.Element => {
  if (!suns || !hours) return <div />
  const transform =
    window.location.hash !== '#alt'
      ? `rotate(${90 - hours[12].angle + 180} ${CX} ${CY})`
      : ''
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={WIDTH}
      height={HEIGHT}
      style={{
        display: 'block',
        margin: 'auto',
      }}
    >
      <g transform={transform}>
        <Colors />
        <Hours />
        <Now />
      </g>
    </svg>
  )
}

const mapStateToProps = ({ suns, hours }: State): Props => ({ suns, hours })

export default connect(mapStateToProps)(Disc)
