import * as React from 'react';

import { Moment, Point, SunDict } from 'src/interfaces';
import { WIDTH, HEIGHT, CX, CY, RADIUS } from 'src/constants';
import Colors from 'src/components/Disc/Colors';
import Time from 'src/components/Disc/Time/Time';

interface Props {
    sunDict: SunDict;
    hours: Moment[];
}

const getCapPath = ({ from, to, radius, sweep }: {
    from: Point,
    to: Point,
    radius: number,
    sweep: string,
}): JSX.Element => (
    <path d={`
        M ${from.x} ${from.y}
        A ${radius} ${radius} 0 ${sweep} ${to.x} ${to.y}
        Z
    `} />
);

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
                    <circle cx={CX} cy={CY} r={RADIUS} />
                </clipPath>
                <clipPath id="clip-cap-day">
                    {getCapPath({
                        from: sunDict.sunriseEnd.point,
                        to: sunDict.sunsetStart.point,
                        radius: RADIUS,
                        sweep: '1 1',
                    })}
                </clipPath>

                <clipPath id="clip-cap-night">
                    {getCapPath({
                        from: sunDict.sunrise.point,
                        to: sunDict.sunset.point,
                        radius: RADIUS,
                        sweep: '0 0',
                    })}
                </clipPath>
            </defs>
            <g transform={transform}>
                <Colors sunDict={sunDict} />
                <Time sunDict={sunDict} hours={hours} />
            </g>
        </svg>
    );
};
