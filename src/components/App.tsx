import * as _ from 'lodash';
import * as React from 'react';
import * as suncalc from 'suncalc';

interface Times {
    sunrise: Date;
    sunriseEnd: Date;
    goldenHourEnd: Date;
    solarNoon: Date;
    goldenHour: Date;
    sunsetStart: Date;
    sunset: Date;
    dusk: Date;
    nauticalDusk: Date;
    night: Date;
    nadir: Date;
    nightEnd: Date;
    nauticalDawn: Date;
    dawn: Date;
}

interface Angles {
    sunrise: number;
    sunriseEnd: number;
    goldenHourEnd: number;
    solarNoon: number;
    goldenHour: number;
    sunsetStart: number;
    sunset: number;
    dusk: number;
    nauticalDusk: number;
    night: number;
    nadir: number;
    nightEnd: number;
    nauticalDawn: number;
    dawn: number;
}

interface Coords {
    sunrise: Coord;
    sunriseEnd: Coord;
    goldenHourEnd: Coord;
    solarNoon: Coord;
    goldenHour: Coord;
    sunsetStart: Coord;
    sunset: Coord;
    dusk: Coord;
    nauticalDusk: Coord;
    night: Coord;
    nadir: Coord;
    nightEnd: Coord;
    nauticalDawn: Coord;
    dawn: Coord;
}

interface Coord {
    x: number;
    y: number;
}

interface State {
    latitude: number | null;
    longitude: number | null;
    times: Times | null;
    angles: Angles | null;
    coords: Coords | null;
}

const WIDTH = 400;
const HEIGHT = 400;
const RADIUS = 180;
const CX = WIDTH / 2;
const CY = HEIGHT / 2;

const colors = {
    day: '#fff6ab',
    golden: '#ffe881',
    horizon: '#f57b75',
    civil: '#1c458a',
    nautical: '#062a67',
    astronomical: '#071c40',
    night: '#111',
};

export default class App extends React.Component<{}, State> {
    constructor() {
        super();
        this.state = {
            latitude: null,
            longitude: null,
            times: null,
            angles: null,
            coords: null,
        };
    }

    componentDidMount() {
        // Get client geolocation
        if (this.state.times) return; // unless we already have it
        navigator.geolocation.getCurrentPosition((pos: Position) => {
            const latitude = pos.coords.latitude;
            const longitude = pos.coords.longitude;
            const times = suncalc.getTimes(new Date(), latitude, longitude);
            const angles = getAngles(times);
            const coords = getCoords(angles, RADIUS, CX, CY);
            this.setState({ latitude, longitude, times, angles, coords });
        }, (e: PositionError) => alert(e.message));
    }

    render() {
        const coords = this.state.coords;
        if (!coords) {
            return (
                <div
                    style={{
                        textAlign: 'center',
                        transform: 'translateY(-50%)',
                        position: 'relative',
                        top: '40%',
                    }}
                >
                    Waiting for geolocation...
                </div>
            );
        }
        return (
            <div style={{ padding: '60px 20px'}}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={WIDTH}
                    height={HEIGHT}
                    style={{
                        display: 'block',
                        margin: 'auto',
                        opacity: 0.94,
                    }}
                >
                    <defs>
                        <clipPath id="clip-disc">
                            <circle cx={CX} cy={CY} r={RADIUS} />
                        </clipPath>
                    </defs>
                    <g clipPath="url(#clip-disc)">
                        {[
                            getTopCap({
                                // daylight
                                left: coords.goldenHourEnd,
                                right: coords.goldenHour,
                                color: colors.day,
                                radius: RADIUS,
                            }),
                            getSegment({
                                // golden hour
                                ul: coords.goldenHourEnd,
                                ur: coords.goldenHour,
                                ll: coords.sunriseEnd,
                                lr: coords.sunsetStart,
                                color: colors.golden,
                                radius: RADIUS,
                            }),
                            getSegment({
                                // sunrise/sunset
                                ul: coords.sunriseEnd,
                                ur: coords.sunsetStart,
                                ll: coords.sunrise,
                                lr: coords.sunset,
                                color: colors.horizon,
                                radius: RADIUS,
                            }),
                            getSegment({
                                // civil twilight
                                ul: coords.sunrise,
                                ur: coords.sunset,
                                ll: coords.dawn,
                                lr: coords.dusk,
                                color: colors.civil,
                                radius: RADIUS,
                            }),
                            getSegment({
                                // nauticaul twilight
                                ul: coords.dawn,
                                ur: coords.dusk,
                                ll: coords.nauticalDawn,
                                lr: coords.nauticalDusk,
                                color: colors.nautical,
                                radius: RADIUS,
                            }),
                            getSegment({
                                // astronomical twilight
                                ul: coords.nauticalDawn,
                                ur: coords.nauticalDusk,
                                ll: coords.nightEnd,
                                lr: coords.night,
                                color: colors.astronomical,
                                radius: RADIUS,
                            }),
                            getBottomCap({
                                // night
                                left: coords.night,
                                right: coords.nightEnd,
                                color: colors.night,
                                radius: RADIUS,
                            }),
                        ]}
                    </g>
                    {/*<circle
                        cx={CX}
                        cy={CY}
                        r={RADIUS}
                        style={{
                            fill: 'transparent',
                            stroke: '#444',
                            strokeWidth: 5,
                        }}
                    />*/}
                </svg>
            </div>
        );
    }
}

const getAngles = (times: Times): Angles => {
    const msPerDeg = (24 * 60 * 60 * 1000) / 360;
    const noonTime = times.solarNoon.getTime();
    return _.reduce(times, (angles, date, name) => {
        const time = date.getTime();
        const diff = time - noonTime;
        angles[name] = diff / msPerDeg + 90;
        return angles;
    }, {});
};

const getCoords = (
    angles: Angles,
    radius: number,
    cx: number,
    cy: number,
): Coords => {
    const x = cx + radius;
    const y = cy;
    return _.reduce(angles, (coords, angle, name) => {
        const radians = (Math.PI / 180) * angle;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        coords[name] = {
            x: (cos * (x - cx)) + (sin * (y - cy)) + cx,
            y: (cos * (y - cy)) - (sin * (x - cx)) + cy,
        };
        return coords;
    }, {});
};

const getSegment = ({ ul, ur, ll, lr, radius, color }: {
    ul: Coord;
    ur: Coord;
    ll: Coord;
    lr: Coord;
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
    left: Coord,
    right: Coord,
    color: string,
    radius: number,
}): JSX.Element => getPath(color, `
    M ${left.x} ${left.y}
    A ${radius} ${radius} 0 1 0 ${right.x} ${right.y}
    Z
`);

const getBottomCap = ({ left, right, radius, color }: {
    left: Coord,
    right: Coord,
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
