import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'

import { COLOR_FUDGE, RADIUS, CX, CY } from '~singletons/constants'
import { Point, State, Suns, Time } from '~singletons/interfaces'

interface Props {
  hours?: Time[]
  suns?: Suns
}

const CAP_FUDGE = COLOR_FUDGE / 2

const checkDay = (suns: Suns): boolean =>
  Boolean(
    suns.sunriseEnd.ms ||
      suns.goldenHourEnd.ms ||
      suns.goldenHour.ms ||
      suns.sunsetStart.ms,
  )

const checkNight = (suns: Suns): boolean =>
  Boolean(
    suns.sunset.ms ||
      suns.dusk.ms ||
      suns.nauticalDusk.ms ||
      suns.night.ms ||
      suns.nightEnd.ms ||
      suns.nauticalDawn.ms ||
      suns.dawn.ms,
  )

const Line = ({ hours, suns }: Props): JSX.Element => {
  if (!hours || !suns) return <g />
  const hasDay = checkDay(suns)
  const hasNight = checkNight(suns)
  return (
    <g style={{ opacity: 0.4 }}>
      <defs>
        <clipPath id="clip-cap-day">
          {suns.sunriseEnd.ms && suns.sunsetStart.ms ? (
            getDayPath({
              left: {
                x: suns.sunriseEnd.point.x,
                y: suns.sunriseEnd.point.y - CAP_FUDGE,
              },
              right: {
                x: suns.sunsetStart.point.x,
                y: suns.sunsetStart.point.y - CAP_FUDGE,
              },
              radius: RADIUS,
            })
          ) : (
            <circle cx={CX} cy={CY} r={RADIUS} />
          )}
        </clipPath>
        <clipPath id="clip-cap-night">
          {suns.sunrise.ms && suns.sunset.ms ? (
            getNightPath({
              left: {
                x: suns.sunrise.point.x,
                y: suns.sunrise.point.y - CAP_FUDGE,
              },
              right: {
                x: suns.sunset.point.x,
                y: suns.sunset.point.y - CAP_FUDGE,
              },
              radius: RADIUS,
            })
          ) : (
            <circle cx={CX} cy={CY} r={RADIUS} />
          )}
        </clipPath>
      </defs>
      {hasDay && (
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
      )}
      {hasNight && (
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
      )}
    </g>
  )
}

const mapStateToProps = ({ hours, suns }: State): Props => ({ hours, suns })

export default connect(mapStateToProps)(Line)

const getDayPath = ({
  left,
  right,
  radius,
}: {
  left: Point
  right: Point
  radius: number
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
}: {
  left: Point
  right: Point
  radius: number
}): JSX.Element => (
  <path
    d={`
      M ${left.x} ${left.y}
      A ${radius} ${radius} 0 1 0 ${right.x} ${right.y}
      Z
    `}
  />
)
