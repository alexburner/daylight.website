import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'

import { State, Suns, Time } from '~singletons/interfaces'

interface StateProps {
  now?: Time
  suns?: Suns
}

type Props = StateProps

const Links = ({ now }: Props): JSX.Element => {
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
        <span style={{ margin: '0 14px' }}>
          {isOdd
            ? moment(now.ms).format('ddd MMM Do YYYY — h:mma')
            : moment(now.ms).format('ddd MMM Do YYYY — h mma')}
        </span>
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

export default connect(mapStateToProps)(Links)
