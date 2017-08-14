import * as moment from 'moment'
import * as React from 'react'
import { connect } from 'react-redux'

import { MS_HOUR } from 'src/singletons/constants'
import { Suns, State, Time } from 'src/singletons/interfaces'

interface Props {
  now: Time | null
  suns: Suns | null
}

const checkSunrise = (now: Time, suns: Suns) =>
  now.ms > suns.sunrise.ms && now.ms <= suns.sunriseEnd.ms

const checkSunset = (now: Time, suns: Suns) =>
  now.ms > suns.sunsetStart.ms && now.ms <= suns.sunset.ms

const checkDay = (now: Time, suns: Suns) =>
  now.ms > suns.sunriseEnd.ms && now.ms <= suns.sunsetStart.ms

const Countdown = ({ now, suns }: Props): JSX.Element => {
  if (!suns || !now) return <div />
  let text = ''
  const isSunrise = checkSunrise(now, suns)
  const isSunset = checkSunset(now, suns)
  const isDay = checkDay(now, suns)
  if (isSunrise || isSunset) {
    text += 'the sun is ' + (isSunrise ? 'rising' : 'setting')
  } else {
    const duration = isDay
      ? moment.duration(suns.sunsetStart.ms - now.ms)
      : moment.duration(suns.sunrise.ms + 24 * MS_HOUR - now.ms) // near enough
    const hours = duration.hours()
    const minutes = duration.minutes()
    const seconds = hours === 0 && minutes === 0 && duration.seconds()
    if (hours) text += hours + 'h '
    if (minutes) text += minutes + 'm '
    if (seconds) text += seconds + 's '
    text += 'until ' + (isDay ? 'sunset' : 'sunrise')
  }
  return (
    <div
      style={{
        background: '#FFF',
        color: '#555',
        fontSize: '21px',
        fontWeight: 'bold',
        height: 'auto',
        padding: '8px',
        textAlign: 'center',
      }}
    >
      {text}
    </div>
  )
}

const mapStateToProps = ({ now, suns }: State): Props => ({ now, suns })

export default connect(mapStateToProps)(Countdown)
