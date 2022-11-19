import React from 'react'
import { connect } from 'react-redux'

import Countdown from '~components/Countdown'
import Disc from '~components/Disc'
import Links from '~components/Links'
import TimeTable from '~components/TimeTable'
import Waiting from '~components/Waiting'
import { WIDTH } from '~singletons/constants'
import { Space, State } from '~singletons/interfaces'
import DateControls from '~components/DateControls'
import Timestamp from './Timestamp'

interface Props {
  space?: Space
}

const App = ({ space }: Props): JSX.Element => {
  if (!space) return <Waiting />
  return (
    <div
      style={{
        minWidth: `${WIDTH + 32}px`,
        padding: '6px 16px',
      }}
    >
      <Countdown />
      <Disc />
      <Timestamp />
      <DateControls>
        <TimeTable />
      </DateControls>
      <Links />
    </div>
  )
}

const mapStateToProps = ({ space }: State): Props => ({ space })

export default connect(mapStateToProps)(App)
