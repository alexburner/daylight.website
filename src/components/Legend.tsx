import * as moment from 'moment';
import * as React from 'react';

import { COLORS, TXT_COLORS } from 'src/constants';
import { SunDict } from 'src/interfaces';

interface Props {
    sunDict: SunDict;
}

const getTimeString = (date: Date): string => moment(date).format('h:mma');
const getTimeRangeString = (from: Date, to: Date): string => (
    getTimeString(from) + ' – ' + getTimeString(to)
);

export default ({ sunDict }: Props) => (
    <table>
        <style>{`
            table {
                border-collapse: collapse;
                font-size: 11px;
                margin: 36px auto;
                opacity: 0.88;
                color: rgba(0,0,0,0.6);
            }

            td {
                padding: 8px 18px;
                text-align: center;
                vertical-align: middle;
            }

            td:first-child,
            td:last-child {
                padding: 8px 12px;
                width: 120px;
            }

            td:first-child {
                text-align: right;
            }

            td:last-child {
                text-align: left;
            }
        `}</style>
        <tr>
            <td>{getTimeString(sunDict.goldenHourEnd.date)}</td>
            <td style={{
                backgroundColor: COLORS.DAYLIGHT,
                color: TXT_COLORS.DAYLIGHT
            }}>
                Daylight
            </td>
            <td>{getTimeString(sunDict.goldenHour.date)}</td>
        </tr>
        <tr>
            <td>{getTimeRangeString(
                sunDict.sunriseEnd.date,
                sunDict.goldenHourEnd.date
            )}</td>
            <td style={{
                backgroundColor: COLORS.GOLDEN,
                color: TXT_COLORS.GOLDEN
            }}>
                Golden Hours
            </td>
            <td>{getTimeRangeString(
                sunDict.goldenHour.date,
                sunDict.sunsetStart.date
            )}</td>
        </tr>
        <tr>
            <td>{getTimeRangeString(
                sunDict.sunrise.date,
                sunDict.sunriseEnd.date
            )}</td>
            <td style={{
                backgroundColor: COLORS.HORIZON,
                color: TXT_COLORS.HORIZON
            }}>
                Sunrise & Sunset
            </td>
            <td>{getTimeRangeString(
                sunDict.sunsetStart.date,
                sunDict.sunset.date
            )}</td>
        </tr>
        <tr>
            <td>{getTimeRangeString(
                sunDict.dawn.date,
                sunDict.sunrise.date
            )}</td>
            <td style={{
                backgroundColor: COLORS.CIVIL,
                color: TXT_COLORS.CIVIL
            }}>
                Twilight (Civil)
            </td>
            <td>{getTimeRangeString(
                sunDict.sunset.date,
                sunDict.dusk.date
            )}</td>
        </tr>
        <tr>
            <td>{getTimeRangeString(
                sunDict.nauticalDawn.date,
                sunDict.dawn.date
            )}</td>
            <td style={{
                backgroundColor: COLORS.NAUTICAL,
                color: TXT_COLORS.NAUTICAL
            }}>
                Twilight (Nautical)
            </td>
            <td>{getTimeRangeString(
                sunDict.dusk.date,
                sunDict.nauticalDusk.date
            )}</td>
        </tr>
        <tr>
            <td>{getTimeRangeString(
                sunDict.nightEnd.date,
                sunDict.nauticalDawn.date
            )}</td>
            <td style={{
                backgroundColor: COLORS.ASTRONOMICAL,
                color: TXT_COLORS.ASTRONOMICAL
            }}>
                Twilight (Astronomical)
            </td>
            <td>{getTimeRangeString(
                sunDict.nauticalDusk.date,
                sunDict.night.date
            )}</td>
        </tr>
        <tr>
            <td>{getTimeString(sunDict.nightEnd.date)}</td>
            <td style={{
                backgroundColor: COLORS.NIGHT,
                color: TXT_COLORS.NIGHT
            }}>
                Night
            </td>
            <td>{getTimeString(sunDict.night.date)}</td>
        </tr>
    </table>
);
