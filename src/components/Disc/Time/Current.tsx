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
    const fudge = -2; // over-clipping in Disc (to cover Colors strangeness)
    const padding = 5;
    const segment = 8;
    const back = segment / 2 + 2;
    return (
        <g
            style={{ opacity: 0.75 }}
            transform={`rotate(${angle} ${point.x} ${point.y})`
        }>
            <polygon
                style={{ fill: '#000' }}
                points={`
                    ${point.x + padding + fudge} ${point.y},
                    ${point.x + padding + segment + fudge} ${point.y + back},
                    ${point.x + padding + segment + fudge} ${point.y - back}
                `}
            />
            <polygon
                style={{ fill: '#000' }}
                points={`
                    ${point.x + padding + segment + fudge} ${point.y + back},
                    ${point.x + padding + segment + fudge} ${point.y - back},
                    ${point.x + padding + segment + fudge + 36} ${point.y - back},
                    ${point.x + padding + segment + fudge + 36} ${point.y + back}
                `}
            />
            <text
                x={point.x + padding + segment + padding + fudge + 4}
                y={point.y}
                dominantBaseline="middle"
                style={{
                    fill: '#FFF',
                    fontSize: '10px',
                }}
            >
                {text}
            </text>
        </g>
    );
};
