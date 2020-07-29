import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'

import { MS_HOUR } from '~singletons/constants'
import { State, Suns, Time } from '~singletons/interfaces'

interface Props {
  now?: Time
  suns?: Suns
  realSuns?: Time[]
  isDay?: boolean
}

const checkSunrise = (now: Time, suns: Suns): boolean =>
  now.ms > suns.sunrise.ms && now.ms <= suns.sunriseEnd.ms

const checkSunset = (now: Time, suns: Suns): boolean =>
  now.ms > suns.sunsetStart.ms && now.ms <= suns.sunset.ms

const checkDay = (now: Time, suns: Suns): boolean =>
  (now.ms >= suns.sunriseEnd.ms ||
    now.ms >= suns.goldenHourEnd.ms ||
    now.ms >= suns.goldenHour.ms) &&
  (now.ms <= suns.goldenHourEnd.ms ||
    now.ms <= suns.goldenHour.ms ||
    now.ms <= suns.sunsetStart.ms)

const Countdown = ({ now, suns, realSuns, isDay }: Props): JSX.Element => {
  if (!suns || !now || !realSuns) return <div />
  let untilText = ''
  const hasSunrise = realSuns.find((t) => t.key === 'sunrise')
  const hasSunset = realSuns.find((t) => t.key === 'sunsetStart')
  const isSunrise = checkSunrise(now, suns)
  const isSunset = checkSunset(now, suns)
  const isNowDay = checkDay(now, suns)
  if ((!realSuns.length && isDay) || (isNowDay && !hasSunset)) {
    untilText += 'no sunset today'
  } else if ((!realSuns.length && !isDay) || (!isNowDay && !hasSunrise)) {
    untilText += 'no sunrise today'
  } else if (isSunrise || isSunset) {
    untilText += 'the sun is ' + (isSunrise ? 'rising' : 'setting')
  } else {
    const duration = isNowDay
      ? moment.duration(suns.sunsetStart.ms - now.ms)
      : moment.duration(suns.sunrise.ms + 24 * MS_HOUR - now.ms) // near enough
    const hours = duration.hours()
    const minutes = duration.minutes()
    const seconds = hours === 0 && minutes === 0 && duration.seconds()
    if (hours) untilText += `${hours}h `
    if (minutes) untilText += `${minutes}m `
    if (seconds) untilText += `${seconds}s `
    untilText += 'until ' + (isNowDay ? 'sunset' : 'sunrise')
  }
  return (
    <div
      className="countdown"
      style={{
        color: '#555',
        height: 'auto',
        padding: '8px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: '28px',
          fontWeight: 'bold',
          margin: '8px 8px -2px',
        }}
      >
        {untilText}
      </div>
    </div>
  )
}

const mapStateToProps = ({ suns, now, realSuns, isDay }: State): Props => ({
  suns,
  now,
  realSuns,
  isDay,
})

export default connect(mapStateToProps)(Countdown)
