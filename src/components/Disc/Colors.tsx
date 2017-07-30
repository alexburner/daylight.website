import * as React from 'react';

import { Point, SunDict } from 'src/interfaces';
import { WIDTH, HEIGHT, CX, CY, RADIUS, COLORS } from 'src/constants';

interface Props {
    sunDict: SunDict;
}

export default ({ sunDict }: Props): JSX.Element => (
    <g clipPath="url(#clip-disc)">{[
        getTopCap({
            // daylight
            left: sunDict.goldenHourEnd.point,
            right: sunDict.goldenHour.point,
            color: COLORS.DAYLIGHT,
            radius: RADIUS,
        }),
        getSegment({
            // golden hour
            ul: sunDict.goldenHourEnd.point,
            ur: sunDict.goldenHour.point,
            ll: sunDict.sunriseEnd.point,
            lr: sunDict.sunsetStart.point,
            color: COLORS.GOLDEN,
            radius: RADIUS,
        }),
        getSegment({
            // sunrise/sunset
            ul: sunDict.sunriseEnd.point,
            ur: sunDict.sunsetStart.point,
            ll: sunDict.sunrise.point,
            lr: sunDict.sunset.point,
            color: COLORS.HORIZON,
            radius: RADIUS,
        }),
        getSegment({
            // civil twilight
            ul: sunDict.sunrise.point,
            ur: sunDict.sunset.point,
            ll: sunDict.dawn.point,
            lr: sunDict.dusk.point,
            color: COLORS.CIVILDUSK,
            radius: RADIUS,
        }),
        getSegment({
            // nauticaul twilight
            ul: sunDict.dawn.point,
            ur: sunDict.dusk.point,
            ll: sunDict.nauticalDawn.point,
            lr: sunDict.nauticalDusk.point,
            color: COLORS.NAUTDUSK,
            radius: RADIUS,
        }),
        getSegment({
            // astronomical twilight
            ul: sunDict.nauticalDawn.point,
            ur: sunDict.nauticalDusk.point,
            ll: sunDict.nightEnd.point,
            lr: sunDict.night.point,
            color: COLORS.ASTRODUSK,
            radius: RADIUS,
        }),
        getBottomCap({
            // night
            left: sunDict.night.point,
            right: sunDict.nightEnd.point,
            color: COLORS.NIGHT,
            radius: RADIUS,
        }),
    ]}</g>
);

const getSegment = ({ ul, ur, ll, lr, radius, color }: {
    ul: Point;
    ur: Point;
    ll: Point;
    lr: Point;
    color: string;
    radius: number,
}): JSX.Element => getPath(color, `
    M ${ul.x} ${ul.y}
    A ${radius} ${radius} 0 0 1 ${ll.x} ${ll.y}
    L ${lr.x} ${lr.y}
    A ${radius} ${radius} 0 0 1 ${ur.x} ${ur.y}
    Z
`);

const getTopCap = ({ left, right, radius, color }: {
    left: Point,
    right: Point,
    color: string,
    radius: number,
}): JSX.Element => getPath(color, `
    M ${left.x} ${left.y}
    A ${radius} ${radius} 0 1 0 ${right.x} ${right.y}
    Z
`);

const getBottomCap = ({ left, right, radius, color }: {
    left: Point,
    right: Point,
    color: string,
    radius: number,
}): JSX.Element => getPath(color, `
    M ${left.x} ${left.y}
    A ${radius} ${radius} 0 0 0 ${right.x} ${right.y}
    Z
`);

const getPath = (color: string, d: string): JSX.Element => (
    <path d={d} style={{ fill: color, stroke: color, strokeWidth: 2 }} />
);
