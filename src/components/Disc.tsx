import * as React from 'react'
import { connect } from 'react-redux'

import { Coord, State, Suns, Time } from 'src/singletons/interfaces'
import { WIDTH, HEIGHT, CX, CY, RADIUS } from 'src/singletons/constants'
import Colors from 'src/components/Disc/Colors'
import Hours from 'src/components/Disc/Hours'
import Now from 'src/components/Disc/Now'

interface Props {
  suns: Suns | null
  hours: Time[] | null
}

const Disc = ({ suns, hours }: Props): JSX.Element => {
  if (!suns || !hours) return <div />
  const transform =
    window.location.hash === '#alt'
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
      <defs>
        <clipPath id="clip-disc">
          <circle cx={CX} cy={CY} r={RADIUS} />
        </clipPath>
        <clipPath id="clip-cap-day">
          {getCapPath({
            from: suns.sunriseEnd.coord,
            to: suns.sunsetStart.coord,
            radius: RADIUS,
            sweep: '1 1',
          })}
        </clipPath>

        <clipPath id="clip-cap-night">
          {getCapPath({
            from: suns.sunrise.coord,
            to: suns.sunset.coord,
            radius: RADIUS,
            sweep: '0 0',
          })}
        </clipPath>
      </defs>
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
