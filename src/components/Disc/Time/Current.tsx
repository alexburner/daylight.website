import * as _ from 'lodash';
import * as React from 'react';

import { SunDict, Moment } from 'src/interfaces';
import { getTimeAngle, getCirclePoint } from 'src/util';

interface Props {
    sunDict: SunDict;
}

export default ({ sunDict }: Props) => {
    const zenithDate = sunDict.solarNoon.date;
    const zenithTime = sunDict.solarNoon.time;
    const currentDate = new Date();
    const date = new Date(
        zenithDate.getFullYear(),
        zenithDate.getMonth(),
        zenithDate.getDate(),
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds(),
        currentDate.getMilliseconds(),
    );
    const time = date.getTime();
    const angle = getTimeAngle(time, zenithTime);
    const point = getCirclePoint(angle);
    const text = 'now';
    const padding = -1;
    const segment = 8;
    const back = segment / 2 + 3;
    const length = 45;
    return (
        <g transform={`rotate(${angle} ${point.x} ${point.y})`}>
            <polygon
                style={{ fill: '#444' }}
                points={`
                    ${point.x + padding} ${point.y},
                    ${point.x + padding + segment} ${point.y + back},
                    ${point.x + padding + segment + length} ${point.y + back},
                    ${point.x + padding + segment + length} ${point.y - back},
                    ${point.x + padding + segment} ${point.y - back}
                `}
            />
            <text
                x={point.x + padding + segment + 12}
                y={point.y}
                dominantBaseline="middle"
                style={{
                    fill: '#FFF',
                    fontSize: '11px',
                    opacity: 0.9,
                }}
            >
                {text}
            </text>
        </g>
    );
};
