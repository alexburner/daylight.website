import * as React from 'react';

import { SunDict } from 'src/interfaces';
import Current from 'src/components/Disc/Time/Current';
import Hours from 'src/components/Disc/Time/Hours';

interface Props {
    sunDict: SunDict;
}

export default ({ sunDict }: Props) => (
    <g>
        <Hours sunDict={sunDict} />
        <Current sunDict={sunDict} />
    </g>
);
