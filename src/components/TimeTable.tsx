import * as React from 'react'
import { connect } from 'react-redux'

import { COLORS, TXT_COLORS } from 'src/singletons/constants'
import { State, Suns, Time } from 'src/singletons/interfaces'

interface Props {
  now?: Time
  suns?: Suns
}

const TimeTable = ({ suns, now }: Props): JSX.Element => {
  if (!suns || !now) return <div />
  return (
    <table>
      <tbody>
        <tr>
          <td>{suns.goldenHourEnd.text}</td>
          <td
            style={{
              backgroundColor: COLORS.DAYLIGHT,
              color: TXT_COLORS.DAYLIGHT,
            }}
          >
            Daylight
          </td>
          <td>{suns.goldenHour.text}</td>
        </tr>
        <tr>
          <td>
            {suns.sunriseEnd.text.slice(0, -2)}
            &ndash;
            {suns.goldenHourEnd.text}
          </td>
          <td
            style={{
              backgroundColor: COLORS.GOLDEN,
              color: TXT_COLORS.GOLDEN,
            }}
          >
            Golden Hour
          </td>
          <td>
            {suns.goldenHour.text.slice(0, -2)}
            &ndash;
            {suns.sunsetStart.text}
          </td>
        </tr>
        <tr>
          <td>
            {suns.sunrise.text.slice(0, -2)}
            &ndash;
            {suns.sunriseEnd.text}
          </td>
          <td
            style={{
              backgroundColor: COLORS.HORIZON,
              color: TXT_COLORS.HORIZON,
            }}
          >
            Sunrise & Sunset
          </td>
          <td>
            {suns.sunsetStart.text.slice(0, -2)}
            &ndash;
            {suns.sunset.text}
          </td>
        </tr>
        <tr>
          <td>
            {suns.dawn.text.slice(0, -2)}
            &ndash;
            {suns.sunrise.text}
          </td>
          <td
            style={{
              backgroundColor: COLORS.CIVIL,
              color: TXT_COLORS.CIVIL,
            }}
          >
            Twilight (Civil)
          </td>
          <td>
            {suns.sunset.text.slice(0, -2)}
            &ndash;
            {suns.dusk.text}
          </td>
        </tr>
        <tr>
          <td>
            {suns.nauticalDawn.text.slice(0, -2)}
            &ndash;
            {suns.dawn.text}
          </td>
          <td
            style={{
              backgroundColor: COLORS.NAUTICAL,
              color: TXT_COLORS.NAUTICAL,
            }}
          >
            Twilight (Nautical)
          </td>
          <td>
            {suns.dusk.text.slice(0, -2)}
            &ndash;
            {suns.nauticalDusk.text}
          </td>
        </tr>
        <tr>
          <td>
            {suns.nightEnd.text.slice(0, -2)}
            &ndash;
            {suns.nauticalDawn.text}
          </td>
          <td
            style={{
              backgroundColor: COLORS.ASTRONOMICAL,
              color: TXT_COLORS.ASTRONOMICAL,
            }}
          >
            Twilight (Astronomical)
          </td>
          <td>
            {suns.nauticalDusk.text.slice(0, -2)}
            &ndash;
            {suns.night.text}
          </td>
        </tr>
        <tr>
          <td>{suns.nightEnd.text}</td>
          <td
            style={{
              backgroundColor: COLORS.NIGHT,
              color: TXT_COLORS.NIGHT,
            }}
          >
            Night
          </td>
          <td>{suns.night.text}</td>
        </tr>
      </tbody>
    </table>
  )
}

const mapStateToProps = ({ suns, now }: State): Props => ({ suns, now })

export default connect(mapStateToProps)(TimeTable)
