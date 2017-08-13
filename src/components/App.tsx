import * as React from 'react'
import { connect } from 'react-redux'

import { Space, State } from 'src/singletons/interfaces'
import Countdown from 'src/components/Countdown'
import Disc from 'src/components/Disc'
import Legend from 'src/components/Legend'
import Links from 'src/components/Links'
import Waiting from 'src/components/Waiting'

interface Props {
  space: Space | null
}

const App = ({ space }: Props): JSX.Element => {
  if (!space) return <Waiting />
  return (
    <div style={{ padding: '6px 16px' }}>
      <Countdown />
      <Disc />
      <Legend />
      <Links />
    </div>
  )
}

const mapStateToProps = ({ space }: State): Props => ({ space })

export default connect(mapStateToProps)(App)
