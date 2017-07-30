import * as _ from 'lodash';
import * as React from 'react';

import { SunDict, Moment } from 'src/interfaces';
import { getTimeAngle, getCirclePoint } from 'src/util';

interface Props {
    sunDict: SunDict;
}

const hourNames = [
    '12am',
    '1am',
    '2am',
    '3am',
    '4am',
    '5am',
    '6am',
    '7am',
    '8am',
    '9am',
    '10am',
    '11am',
    '12pm',
    '1pm',
    '2pm',
    '3pm',
    '4pm',
    '5pm',
    '6pm',
    '7pm',
    '8pm',
    '9pm',
    '10pm',
    '11pm',
];

const getHours = (zenithDate: Date, zenithTime: number): Moment[] => {
    const startDate = new Date(
        zenithDate.getFullYear(),
        zenithDate.getMonth(),
        zenithDate.getDate(),
        0, // hours
        0, // minutes
        0, // seconds
    );
    const startTime = startDate.getTime();
    return _.map(hourNames, (text: string, i: number) => {
        const time = startTime + i * 60 * 60 * 1000;
        const angle = getTimeAngle(time, zenithTime);
        const point = getCirclePoint(angle);
        const moment: Moment = { angle, point, text };
        return moment;
    });
};

export default ({ sunDict }: Props) => {
    const hours = getHours(sunDict.solarNoon.date, sunDict.solarNoon.time);
    const fudge = -2; // over-clipping in Disc (to cover Colors strangeness)
    const padding = 6;
    const segment = 6;
    return (
        <g style={{ opacity: 0.4 }}>
            {_.map(hours, ({angle, point, text}: Moment) => (
                <g transform={`rotate(${angle} ${point.x} ${point.y})`}>
                    <text
                        x={point.x + padding + segment + padding + fudge}
                        y={point.y}
                        dominantBaseline="middle"
                        style={{
                            fill: '#000',
                            fontSize: '12px',
                        }}
                    >
                        {text}
                    </text>
                    <line
                        x1={point.x + padding + fudge}
                        y1={point.y}
                        x2={point.x + padding + segment + fudge}
                        y2={point.y}
                        style={{
                            stroke: '#000',
                            strokeWidth: 1,
                        }}
                    />
                </g>
            ))}
            <line
                x1={hours[0].point.x}
                y1={hours[0].point.y}
                x2={hours[12].point.x}
                y2={hours[12].point.y}
                strokeDasharray="5, 5"
                style={{
                    opacity: 0.6,
                    stroke: '#000',
                    strokeWidth: 1,
                }}
            />
        </g>
    );
};
