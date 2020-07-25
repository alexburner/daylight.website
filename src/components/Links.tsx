import moment from 'moment'
import React from 'react'
import { connect, Dispatch } from 'react-redux'

import {
  State,
  Suns,
  Time,
  ActionType,
  NudgeDirection,
  NudgeDuration,
} from '~singletons/interfaces'

interface StateProps {
  now?: Time
  suns?: Suns
}

interface DispatchProps {
  nudge(direction: NudgeDirection, duration: NudgeDuration): void
}

type Props = StateProps & DispatchProps

const Links = ({ now, nudge }: Props): JSX.Element => {
  if (!now) return <div />
  const isOdd = Boolean(Math.floor(now.ms / 1000) % 2)
  return (
    <div>
      <div
        className="date-label"
        style={{
          fontSize: '14px',
          margin: '24px 0 18px',
          textAlign: 'center',
        }}
      >
        <button
          onClick={() => nudge(NudgeDirection.Backward, NudgeDuration.Week)}
        >
          ◀◀
        </button>
        <button
          onClick={() => nudge(NudgeDirection.Backward, NudgeDuration.Day)}
        >
          ◀
        </button>
        <span style={{ margin: '0 14px' }}>
          {isOdd
            ? moment(now.ms).format('ddd MMM Do YYYY — h:mma')
            : moment(now.ms).format('ddd MMM Do YYYY — h mma')}
        </span>
        <button
          onClick={() => nudge(NudgeDirection.Forward, NudgeDuration.Day)}
        >
          ▶
        </button>
        <button
          onClick={() => nudge(NudgeDirection.Forward, NudgeDuration.Week)}
        >
          ▶▶
        </button>
      </div>
      <div
        style={{
          fontSize: '10px',
          margin: '0 auto 72px',
          textAlign: 'center',
        }}
      >
        <div>
          <a
            href="https://github.com/mourner/suncalc"
            title="SunCalc – A tiny JavaScript library for calculating sun/moon positions and phases"
            target="_blank"
            rel="noreferrer"
          >
            SunCalc
          </a>
          &nbsp; &nbsp; &#9682; &nbsp; &nbsp;
          <a
            href="https://en.wikipedia.org/wiki/Twilight"
            title="Twilight – Wikipedia, the free encyclopedia"
            target="_blank"
            rel="noreferrer"
          >
            Twilight
          </a>
        </div>
        <div style={{ marginTop: '9px' }}>
          <a
            href="https://github.com/alexburner/daylight.website"
            title="Daylight – GitHub"
            target="_blank"
            rel="noreferrer"
          >
            Source Code
          </a>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ now, suns }: State): StateProps => ({ now, suns })

const mapDispatchToProps = (dispatch: Dispatch<State>): DispatchProps => ({
  nudge: (direction, duration) =>
    dispatch({ type: ActionType.Nudge, direction, duration }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Links)
