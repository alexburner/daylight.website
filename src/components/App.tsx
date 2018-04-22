import * as React from 'react'
import { connect } from 'react-redux'

import Countdown from 'src/components/Countdown'
import Disc from 'src/components/Disc'
import Legend from 'src/components/Legend'
import Links from 'src/components/Links'
import Waiting from 'src/components/Waiting'
import { WIDTH } from 'src/singletons/constants'
import { Space, State } from 'src/singletons/interfaces'

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
      <Legend />
      <Links />
    </div>
  )
}

const mapStateToProps = ({ space }: State): Props => ({ space })

export default connect(mapStateToProps)(App)
