import * as React from 'react'

import { Moment, SunDict } from 'src/singletons/interfaces'
import Current from 'src/components/Disc/Time/Current'
import Hours from 'src/components/Disc/Time/Hours'

interface Props {
  sunDict: SunDict
  hours: Moment[]
}

export default ({ sunDict, hours }: Props) =>
  <g>
    <Hours hours={hours} />
    <Current sunDict={sunDict} />
  </g>
