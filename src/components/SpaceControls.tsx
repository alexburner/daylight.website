import React from 'react'
import { connect, Dispatch } from 'react-redux'

import { State, Space, ActionType } from '~singletons/interfaces'

interface StateProps {
  space?: Space
}

interface DispatchProps {
  setSpace(longitude: number, latitude: number): void
}

type Props = StateProps & DispatchProps

const Space = ({ space, setSpace }: Props): JSX.Element => {
  if (!space) return <div />
  return (
    <div>
      <div
        className="space-display"
        style={{
          margin: '36px 0 0',
        }}
      >
        <div
          style={{
            margin: '0 0 6px',
            fontSize: '14px',
          }}
        >
          46°59′5″ N | 122°54′8″ W
        </div>
        <div
          style={{
            fontSize: '12px',
            color: 'rgba(0, 0, 0, 0.6)',
          }}
        >
          {/* 10733 Durland Avenue Northeast, Seattle, WA, USA */}
          Seattle, WA, USA
        </div>
        {/* <div
          style={{
            margin: '6px 0 0',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '12px',
          }}
        >
          <div>
            <label htmlFor="longitude">lat.</label>
            &nbsp;
            <input
              id="longitude"
              type="number"
              value={space.longitude}
              onChange={(e) => {
                setSpace(+e.target.value, space.latitude)
              }}
              style={{
                width: '14ch',
                textAlign: 'center',
                border: 'none',
                padding: '2px',
                color: 'rgba(0, 0, 0, 0.6)',
                fontSize: '12px',
              }}
            />
          </div>
          <div>
            <label htmlFor="latitude">long.</label>
            &nbsp;
            <input
              id="latitude"
              type="number"
              value={space.latitude}
              onChange={(e) => {
                setSpace(space.longitude, +e.target.value)
              }}
              style={{
                width: '14ch',
                textAlign: 'center',
                border: 'none',
                padding: '2px',
                color: 'rgba(0, 0, 0, 0.6)',
                fontSize: '12px',
              }}
            />
          </div>
        </div> */}
      </div>
    </div>
  )
}

const mapStateToProps = ({ space }: State): StateProps => ({ space })

const mapDispatchToProps = (dispatch: Dispatch<State>): DispatchProps => ({
  setSpace: (longitude, latitude) => {
    dispatch({ type: ActionType.Space, space: { longitude, latitude } })
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Space)
