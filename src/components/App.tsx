import * as React from 'react'
import { connect } from 'react-redux'

import { Space, State } from 'src/singletons/interfaces'
import Disc from 'src/components/Disc'
import Legend from 'src/components/Legend'
import Waiting from 'src/components/Waiting'

interface Props {
  space: Space | null
}

const App = ({ space }: Props): JSX.Element => {
  if (!space) return <Waiting />
  return (
    <div style={{ padding: '15px' }}>
      <Disc />
      <Legend />
    </div>
  )
}

const mapStateToProps = ({ space }: State): Props => ({ space })

export default connect(mapStateToProps)(App)
