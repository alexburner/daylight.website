import * as _ from 'lodash';
import * as React from 'react';
import * as suncalc from 'suncalc';

import { SunCalcs, SunDict, SunMoment } from 'src/interfaces';
import { getTimeAngle, getCirclePoint } from 'src/util';
import Disc from 'src/components/Disc/Disc';

interface State {
    latitude: number | null;
    longitude: number | null;
    sunDict: SunDict | null;
}

export default class App extends React.Component<{}, State> {
    constructor() {
        super();
        this.state = {
            latitude: null,
            longitude: null,
            sunDict: null,
        };
    }

    componentDidMount() {
        if (this.state.sunDict) return;
        navigator.geolocation.getCurrentPosition((position: Position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const sunCalcs: SunCalcs = suncalc.getTimes(
                new Date(),
                latitude,
                longitude
            );
            const zenithTime = sunCalcs.solarNoon.getTime();
            const sunDict: SunDict = _.reduce(
                sunCalcs,
                (dict: SunDict, date: Date, key: string) => {
                    const time = date.getTime();
                    const angle = getTimeAngle(time, zenithTime);
                    const point = getCirclePoint(angle);
                    const moment: SunMoment = { date, time, angle, point };
                    dict[key] = moment;
                    return dict;
                },
                {}
            );
            this.setState({ latitude, longitude, sunDict });
        }, (e: PositionError) => alert(e.message));
    }

    render() {
        if (!this.state.sunDict) {
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
                <Disc sunDict={this.state.sunDict} />
            </div>
        );
    }
}
