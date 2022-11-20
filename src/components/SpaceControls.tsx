import React, { ReactNode, useState } from 'react'
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
      <div style={{ margin: '36px 0 0' }}>
        <SpacePopover>
          <SpaceDisplay space={space} />
        </SpacePopover>
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

const SpaceDisplay = ({ space }: { space: Space }): JSX.Element => {
  if (!space) return <div />
  return (
    <div>
      <div
        style={{
          margin: '0 auto 6px',
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
    </div>
  )
}

const SpacePopover = ({ children }: { children?: ReactNode }): JSX.Element => {
  const [showPopover, setShowPopover] = useState(false)
  return (
    <div style={{ position: 'relative' }}>
      {/* Trigger */}
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => setShowPopover((prev) => !prev)}
      >
        {children}
      </div>
      {showPopover && (
        <>
          {/* Backdrop */}
          <div
            style={{
              position: 'absolute',
              top: '-100vh',
              bottom: '-100vh',
              left: '-100vw',
              right: '-100vw',
              background: 'rgba(0, 0, 0, 0.3)',
              zIndex: 10,
            }}
            onClick={() => setShowPopover(false)}
          ></div>
          {/* Panel */}
          <div
            style={{
              width: '400px',
              height: '600px',
              position: 'absolute',
              bottom: '50px',
              right: '50%',
              zIndex: 10,
              transform: 'translateX(50%)',
              background: '#FFF',
              border: '1px solid #E8E8E8',
              borderRadius: '10px',
              boxShadow:
                '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
          >
            {/* Arrow */}
            <div
              style={{
                width: '15px',
                height: '15px',
                position: 'absolute',
                bottom: '-15px',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(45deg)',
                borderBottom: '1px solid #E8E8E8',
                borderRight: '1px solid #E8E8E8',
                background: '#FFF',
              }}
            />
            {/* Content */}
            Hello
          </div>
        </>
      )}
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
