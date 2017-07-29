import * as _ from 'lodash';
import * as React from 'react';
import * as suncalc from 'suncalc';

console.log(suncalc);

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

interface State {
    latitude: number|null;
    longitude: number|null;
    times: Times|null;
}

const WIDTH = 600;
const HEIGHT = 600;
const RADIUS = 200;
const CX = WIDTH / 2;
const CY = HEIGHT / 2;

export default class App extends React.Component<{}, State> {
    constructor() {
        super();
        this.state = {
            latitude: null,
            longitude: null,
            times: null,
        };

        // Get client geolocation
        navigator.geolocation.getCurrentPosition((pos: Position) => {
            const latitude = pos.coords.latitude;
            const longitude = pos.coords.longitude;
            const times = suncalc.getTimes(new Date(), latitude, longitude);
            this.setState({ latitude, longitude, times });
        }, (e: PositionError) => alert(e.message));
    }

    render() {
        if (!this.state.times) return <div>Waiting for geolocation...</div>;
        const angles = getAngles(this.state.times);
        return (
            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={WIDTH}
                    height={HEIGHT}
                >
                    <circle
                        cx={CX}
                        cy={CY}
                        r={RADIUS}
                        style={{
                            fill: 'transparent',
                            stroke: '#333',
                            strokeWidth: 12,
                        }}
                    />
                    {_.map(angles, angle => (
                        <circle
                            cx={CX + RADIUS}
                            cy={CY}
                            r={6}
                            fill="red"
                            transform={`rotate(${angle} ${CX} ${CY})`}
                        />
                    ))}
                </svg>
            </div>
        );
    }
}

const getAngles = (times: Times): number[] => {
    const angles = [];
    const msPerDeg = (24 * 60 * 60 * 1000) / 360;
    const noonTime = times.solarNoon.getTime();
    return _.map(times, date => {
        const time = date.getTime();
        const diff = time - noonTime;
        return diff / msPerDeg - 90;
    });
};
