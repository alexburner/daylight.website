import * as moment from 'moment'
import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import { MS_HOUR } from 'src/singletons/constants'
import {
  ActionType,
  NudgeDirection,
  NudgeDuration,
  State,
  Suns,
  Time,
} from 'src/singletons/interfaces'

interface StateProps {
  now?: Time
  suns?: Suns
}

interface DispatchProps {
  nudge(direction: NudgeDirection, duration: NudgeDuration): void
}

type Props = StateProps & DispatchProps

const checkSunrise = (now: Time, suns: Suns) =>
  now.ms > suns.sunrise.ms && now.ms <= suns.sunriseEnd.ms

const checkSunset = (now: Time, suns: Suns) =>
  now.ms > suns.sunsetStart.ms && now.ms <= suns.sunset.ms

const checkDay = (now: Time, suns: Suns) =>
  now.ms > suns.sunriseEnd.ms && now.ms <= suns.sunsetStart.ms

const Countdown = ({ now, suns, nudge }: Props): JSX.Element => {
  if (!suns || !now) return <div />
  const dateText = moment(now.ms).format('ddd MMM Do YYYY, h:mma')
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
      className="countdown"
      style={{
        color: '#555',
        height: 'auto',
        padding: '8px',
        textAlign: 'center',
      }}
    >
      {/* <div
        style={{
          fontSize: '15px',
          margin: '3px 9px',
        }}
      >
        <button
          onClick={() => nudge(NudgeDirection.Backward, NudgeDuration.Week)}
        >
          <i className="fa fa-angle-double-left" />
        </button>
        <button
          onClick={() => nudge(NudgeDirection.Backward, NudgeDuration.Day)}
        >
          <i className="fa fa-angle-left" />
        </button>
        <span style={{ margin: '0 8px' }}>{dateText}</span>
        <button
          onClick={() => nudge(NudgeDirection.Forward, NudgeDuration.Day)}
        >
          <i className="fa fa-angle-right" />
        </button>
        <button
          onClick={() => nudge(NudgeDirection.Forward, NudgeDuration.Week)}
        >
          <i className="fa fa-angle-double-right" />
        </button>
      </div> */}
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

const mapStateToProps = ({ now, suns }: State): StateProps => ({ now, suns })

const mapDispatchToProps = (dispatch: Dispatch<State>): DispatchProps => ({
  nudge: (direction, duration) =>
    dispatch({ type: ActionType.Nudge, direction, duration }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Countdown)
