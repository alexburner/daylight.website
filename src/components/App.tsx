import * as _ from 'lodash';
import * as React from 'react';
import * as suncalc from 'suncalc';

import { Moment, SunCalcs, SunDict } from 'src/interfaces';
import { getSunDict, getHours, getTimeAngle, getCirclePoint } from 'src/util';
import Disc from 'src/components/Disc/Disc';
// import Legend from 'src/components/Legend';

interface State {
    latitude: number | null;
    longitude: number | null;
    sunDict: SunDict | null;
    hours: Moment[] | null;
}

export default class App extends React.Component<{}, State> {
    constructor() {
        super();
        this.state = {
            latitude: null,
            longitude: null,
            sunDict: null,
            hours: null,
        };
    }

    setSunState(latitude: number, longitude: number) {
        const sunCalcs: SunCalcs = suncalc.getTimes(
            new Date(),
            latitude,
            longitude
        );
        const sunDict = getSunDict(sunCalcs);
        const hours = getHours(sunDict.solarNoon.date, sunDict.solarNoon.time);
        this.setState({ latitude, longitude, sunDict, hours });
        window.localStorage.setItem('position', `${latitude},${longitude}`);
    }

    componentDidMount() {
        if (this.state.sunDict) return;
        const position = window.localStorage.getItem('position');
        if (position && position.length) {
            const parts = position.split(',');
            const latitude = Number(parts[0]);
            const longitude = Number(parts[1]);
            this.setSunState(latitude, longitude);
        } else {
            navigator.geolocation.getCurrentPosition((position: Position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                this.setSunState(latitude, longitude);
            }, (e: PositionError) => alert(e.message));
        }
    }

    render() {
        if (!this.state.sunDict || !this.state.hours) {
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
            <div style={{ padding: '10px'}}>
                <Disc sunDict={this.state.sunDict} hours={this.state.hours} />
            </div>
        );
    }
}

{
    // TODO TEMP allow flushing cached position with #reset hash
    const hash = window.location.hash;
    const reset = '#reset';
    if (hash === reset) {
        window.localStorage.removeItem('position');
        window.location.href = window.location.href.slice(0, -reset.length);
    }
}
