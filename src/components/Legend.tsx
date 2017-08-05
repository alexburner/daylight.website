import * as React from 'react';

import { SunDict } from 'src/interfaces';

interface Props {
    sunDict: SunDict;
}

export default ({ sunDict }: Props) => (
    <table>
        <tr>
            <td colSpan={2}>Full daylight</td>
        </tr>
            <td>Golden hour</td>
            <td>Golden hour</td>
        <tr>
        </tr>
        <tr>
            <td>Sunrise</td>
            <td>Sunset</td>
        </tr>
        <tr>
            <td>Civil dawn</td>
            <td>Civil dusk</td>
        </tr>
        <tr>
            <td>Nautical dawn</td>
            <td>Nautical dusk</td>
        </tr>
        <tr>
            <td>Astronomical dawn</td>
            <td>
                Astronomical dusk
                &nbsp;
                {sunDict.nauticalDusk.date.toLocaleTimeString()}
                &nbsp;
                &ndash;
                &nbsp;
                {sunDict.night.date.toLocaleTimeString()}
            </td>
        </tr>
        <tr>
            <td colSpan={2}>Full night</td>
        </tr>
    </table>
);
