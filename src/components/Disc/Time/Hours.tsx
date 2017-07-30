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
    return (
        <g>
            {_.map(hours, (hour: Moment) => (
                <circle
                    cx={hour.point.x}
                    cy={hour.point.y}
                    r="6"
                    fill="red"
                />
            ))}
        </g>
    );
};
