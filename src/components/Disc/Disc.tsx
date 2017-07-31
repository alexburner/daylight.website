import * as React from 'react';

import { Moment, SunDict } from 'src/interfaces';
import { WIDTH, HEIGHT, CX, CY, RADIUS } from 'src/constants';
import Colors from 'src/components/Disc/Colors';
import Time from 'src/components/Disc/Time/Time';

interface Props {
    sunDict: SunDict;
    hours: Moment[];
}

export default ({ sunDict, hours }: Props) => {
    const transform = window.location.hash === '#alt'
        ? `rotate(${90 - hours[12].angle + 180} ${CX} ${CY})`
        : '';
    return (
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
            <g transform={transform}>
                <Colors sunDict={sunDict} />
                <Time sunDict={sunDict} hours={hours} />
            </g>
        </svg>
    );
};
