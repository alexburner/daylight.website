import * as moment from 'moment'
import * as React from 'react'
import { connect } from 'react-redux'

import { MS_HOUR } from 'src/singletons/constants'
import { State, Suns, Time } from 'src/singletons/interfaces'

interface Props {
  now: Time
  suns: Suns
}

const checkSunrise = (now: Time, suns: Suns) =>
  now.ms > suns.sunrise.ms && now.ms <= suns.sunriseEnd.ms

const checkSunset = (now: Time, suns: Suns) =>
  now.ms > suns.sunsetStart.ms && now.ms <= suns.sunset.ms

const checkDay = (now: Time, suns: Suns) =>
  now.ms > suns.sunriseEnd.ms && now.ms <= suns.sunsetStart.ms

const Countdown = ({ now, suns }: Props): JSX.Element => {
  if (!suns || !now) return <div />
  const dateText = moment(now.ms).format('ddd MMM Do YYYY, h:mm a')
  let untilText = ''
  const isSunrise = checkSunrise(now, suns)
  const isSunset = checkSunset(now, suns)
  const isDay = checkDay(now, suns)
  if (isSunrise || isSunset) {
    untilText += 'the sun is ' + (isSunrise ? 'rising' : 'setting')
  } else {
    const duration = isDay
      ? moment.duration(suns.sunsetStart.ms - now.ms)
      : moment.duration(suns.sunrise.ms + 24 * MS_HOUR - now.ms) // near enough
    const hours = duration.hours()
    const minutes = duration.minutes()
    const seconds = hours === 0 && minutes === 0 && duration.seconds()
    if (hours) untilText += `${hours}h `
    if (minutes) untilText += `${minutes}m `
    if (seconds) untilText += `${seconds}s `
    untilText += 'until ' + (isDay ? 'sunset' : 'sunrise')
  }
  return (
    <div
      style={{
        color: '#555',
        height: 'auto',
        padding: '8px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: '11px',
          margin: '3px 9px',
        }}
      >
        {dateText}
      </div>
      <div
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        {untilText}
      </div>
    </div>
  )
}

const mapStateToProps = ({ now, suns }: State): Props => ({ now, suns })

export default connect(mapStateToProps)(Countdown)
