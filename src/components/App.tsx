import * as _ from 'lodash';
import * as React from 'react';
import * as suncalc from 'suncalc';

import { CX, CY, RADIUS, MS_PER_DEG } from 'src/constants';
import { Point, SunCalcs, SunDict } from 'src/interfaces';
import { rotatePoint } from 'src/util';
import Disc from 'src/components/Disc/Disc';

interface State {
    latitude: number | null;
    longitude: number | null;
    sunDict: SunDict | null;
}

const getAngle = (time: number, zeroTime: number): number => {
    const diff = time - zeroTime;
    const angle = diff / MS_PER_DEG;
    return angle + 90;
};

const getPoint = (angle: number): Point => rotatePoint({
    point: { x: CX + RADIUS, y: CY },
    origin: { x: CX, y: CY },
    angle,
});

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
            const sunDict: SunDict = _.reduce(sunCalcs, (dict, date, key) => {
                const time = date.getTime();
                const angle = getAngle(time, zenithTime);
                const point = getPoint(angle);
                dict[key] = { time, angle, point };
                return dict;
            }, {});
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
