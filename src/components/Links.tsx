import * as moment from 'moment'
import * as React from 'react'
import { connect } from 'react-redux'

import { State, Suns, Time } from 'src/singletons/interfaces'

interface Props {
  now?: Time
  suns?: Suns
}

const Links = ({ now }: Props): JSX.Element => {
  if (!now) return <div />
  const isOdd = Boolean(Math.floor(now.ms / 1000) % 2)
  return (
    <div>
      <div
        style={{
          fontSize: '14px',
          margin: '24px 0 18px',
          textAlign: 'center',
        }}
      >
        {isOdd
          ? moment(now.ms).format('ddd MMM Do YYYY — h:mma')
          : moment(now.ms).format('ddd MMM Do YYYY — h mma')}
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
          >
            SunCalc
          </a>
          &nbsp; &nbsp; &#9682; &nbsp; &nbsp;
          <a
            href="https://en.wikipedia.org/wiki/Twilight"
            title="Twilight – Wikipedia, the free encyclopedia"
            target="_blank"
          >
            Twilight
          </a>
        </div>
        <div style={{ marginTop: '9px' }}>
          <a
            href="https://github.com/alexburner/daylight.website"
            title="Daylight – GitHub"
            target="_blank"
          >
            Source Code
          </a>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ suns, now }: State): Props => ({ suns, now })

export default connect(mapStateToProps)(Links)
