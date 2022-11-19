import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'

import { State, Suns, Time } from '~singletons/interfaces'

interface StateProps {
  now?: Time
  suns?: Suns
}

type Props = StateProps

const Timestamp = ({ now }: Props): JSX.Element => {
  if (!now) return <div />
  const isOdd = Boolean(Math.floor(now.ms / 1000) % 2)
  return (
    <div
      className="date-label"
      style={{
        fontSize: '14px',
        margin: '12px 0 24px',
        textAlign: 'center',
      }}
    >
      <span style={{ margin: '0 14px' }}>
        {isOdd
          ? moment(now.ms).format('ddd MMM Do YYYY — h:mma')
          : moment(now.ms).format('ddd MMM Do YYYY — h mma')}
      </span>
    </div>
  )
}

const mapStateToProps = ({ now, suns }: State): StateProps => ({ now, suns })

export default connect(mapStateToProps)(Timestamp)
