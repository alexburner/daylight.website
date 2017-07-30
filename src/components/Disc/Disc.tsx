import * as React from 'react';

import { SunDict } from 'src/interfaces';
import { WIDTH, HEIGHT, CX, CY, RADIUS } from 'src/constants';
import Colors from 'src/components/Disc/Colors';
import Time from 'src/components/Disc/Time/Time';

interface Props {
    sunDict: SunDict;
}

export default ({ sunDict }: Props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={WIDTH}
        height={HEIGHT}
        style={{
            display: 'block',
            margin: 'auto',
        }}
    >
        <defs>
            <clipPath id="clip-disc">
                <circle cx={CX} cy={CY} r={RADIUS - 2} />
            </clipPath>
        </defs>
        <Colors sunDict={sunDict} />
        <Time sunDict={sunDict} />
    </svg>
);
