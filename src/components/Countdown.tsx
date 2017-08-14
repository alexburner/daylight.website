import * as moment from 'moment'
import * as React from 'react'
import { connect } from 'react-redux'

import { Suns, State, Time } from 'src/singletons/interfaces'

interface Props {
  now: Time | null
  suns: Suns | null
}

const isSunrise = (now: Time, suns: Suns) =>
  now.ms > suns.sunrise.ms && now.ms < suns.sunriseEnd.ms

const isSunset = (now: Time, suns: Suns) =>
  now.ms > suns.sunsetStart.ms && now.ms < suns.sunset.ms

const isDay = (now: Time, suns: Suns) =>
  now.ms > suns.sunriseEnd.ms && now.ms < suns.sunsetStart.ms

const isNight = (now: Time, suns: Suns) =>
  now.ms > suns.sunset.ms && now.ms < suns.sunrise.ms

const Countdown = ({ now, suns }: Props): JSX.Element => {
  if (!now || !suns) return <div />
  let text = ''
  if (isSunrise(now, suns)) {
    text = 'the sun is rising'
  } else if (isSunset(now, suns)) {
    text = 'the sun is setting'
  } else if (isDay(now, suns)) {
    const duration = moment.duration(suns.sunsetStart.ms - now.ms)
    const hours = duration.hours()
    const minutes = duration.minutes()
    const seconds = duration.seconds()
    text = `${hours}h ${minutes}m ${seconds}s until sunset`
  } else if (isNight(now, suns)) {
    const duration = moment.duration(suns.sunrise.ms - now.ms)
    const hours = duration.hours()
    const minutes = duration.minutes()
    const seconds = duration.seconds()
    text = `${hours}h ${minutes}m ${seconds}s until sunrise`
  } else {
    text = 'wait, what'
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
