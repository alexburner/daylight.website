import * as _ from 'lodash';
import * as React from 'react';

import { SunDict, Moment } from 'src/singletons/interfaces';
import { getTimeAngle, getCirclePoint } from 'src/singletons/util';

import { WIDTH, HEIGHT, CX, CY, RADIUS, COLORS } from 'src/singletons/constants';

interface Props {
    hours: Moment[];
}

export default ({ hours }: Props) => {
    const padding = 6;
    const segment = 6;
    return (
        <g style={{ opacity: 0.4 }}>
            {_.map(hours, ({angle, point, text}: Moment) => (
                <g transform={`rotate(${angle} ${point.x} ${point.y})`}>
                    <text
                        x={point.x + padding + 1 + segment + padding - 1}
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
                        x1={point.x + padding + 1}
                        y1={point.y}
                        x2={point.x + padding + 1 + segment}
                        y2={point.y}
                        style={{
                            stroke: '#000',
                            strokeWidth: 1,
                        }}
                    />
                </g>
            ))}
            <line
                clipPath="url(#clip-cap-day)"
                x1={hours[0].point.x}
                y1={hours[0].point.y}
                x2={hours[12].point.x}
                y2={hours[12].point.y}
                strokeDasharray="4, 4"
                style={{
                    opacity: 0.5,
                    stroke: '#000',
                    strokeWidth: 1,
                }}
            />
            <line
                clipPath="url(#clip-cap-night)"
                x1={hours[0].point.x}
                y1={hours[0].point.y}
                x2={hours[12].point.x}
                y2={hours[12].point.y}
                strokeDasharray="4, 4"
                style={{
                    opacity: 0.9,
                    stroke: '#FFF',
                    strokeWidth: 1,
                }}
            />
        </g>
    );
};
