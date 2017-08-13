import * as React from 'react'
import { connect } from 'react-redux'

import { COLORS, TXT_COLORS } from 'src/singletons/constants'
import { Suns, State } from 'src/singletons/interfaces'

interface Props {
  suns: Suns | null
}

const Legend = ({ suns }: Props): JSX.Element => {
  if (!suns) return <div />
  return (
    <table>
      <tbody>
        <tr>
          <td>
            {suns.goldenHourEnd.text}
          </td>
          <td
            style={{
              backgroundColor: COLORS.DAYLIGHT,
              color: TXT_COLORS.DAYLIGHT,
            }}
          >
            Daylight
          </td>
          <td>
            {suns.goldenHour.text}
          </td>
        </tr>
        <tr>
          <td>
            {suns.sunriseEnd.text}
            &nbsp;&ndash;&nbsp;
            {suns.goldenHourEnd.text}
          </td>
          <td
            style={{
              backgroundColor: COLORS.GOLDEN,
              color: TXT_COLORS.GOLDEN,
            }}
          >
            Golden Hours
          </td>
          <td>
            {suns.goldenHour.text}
            &nbsp;&ndash;&nbsp;
            {suns.sunsetStart.text}
          </td>
        </tr>
        <tr>
          <td>
            {suns.sunrise.text}
            &nbsp;&ndash;&nbsp;
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
            {suns.sunsetStart.text}
            &nbsp;&ndash;&nbsp;
            {suns.sunset.text}
          </td>
        </tr>
        <tr>
          <td>
            {suns.dawn.text}
            &nbsp;&ndash;&nbsp;
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
            {suns.sunset.text}
            &nbsp;&ndash;&nbsp;
            {suns.dusk.text}
          </td>
        </tr>
        <tr>
          <td>
            {suns.nauticalDawn.text}
            &nbsp;&ndash;&nbsp;
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
            {suns.dusk.text}
            &nbsp;&ndash;&nbsp;
            {suns.nauticalDusk.text}
          </td>
        </tr>
        <tr>
          <td>
            {suns.nightEnd.text}
            &nbsp;&ndash;&nbsp;
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
            {suns.nauticalDusk.text}
            &nbsp;&ndash;&nbsp;
            {suns.night.text}
          </td>
        </tr>
        <tr>
          <td>
            {suns.nightEnd.text}
          </td>
          <td
            style={{
              backgroundColor: COLORS.NIGHT,
              color: TXT_COLORS.NIGHT,
            }}
          >
            Night
          </td>
          <td>
            {suns.night.text}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

const mapStateToProps = ({ suns }: State): Props => ({ suns })

export default connect(mapStateToProps)(Legend)
