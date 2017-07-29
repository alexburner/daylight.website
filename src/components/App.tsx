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
        return (
            <div>
                <p>
                    latitude = {this.state.latitude},
                    longitude = {this.state.longitude}
                </p>
                <code>
                    {JSON.stringify(this.state.times)}
                </code>
            </div>
        );
    }
}
