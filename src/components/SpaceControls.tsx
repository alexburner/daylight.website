import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import { connect, Dispatch } from 'react-redux'

import { State, Space, ActionType } from '~singletons/interfaces'
import { getDmsStrings } from '~util/dms'

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
    <div style={{ margin: '36px 0 0' }}>
      <SpacePopover space={space} setSpace={setSpace}>
        <SpaceDisplay space={space} />
      </SpacePopover>
    </div>
  )
}

const SpaceDisplay = ({ space }: { space: Space }): JSX.Element => {
  if (!space) throw new Error('Unreachable')
  const strings = useMemo(
    () => getDmsStrings(space.latitude, space.longitude),
    [space.latitude, space.longitude],
  )
  return (
    <div>
      <div
        style={{
          margin: '0 auto 6px',
          fontSize: '14px',
        }}
      >
        {strings.lat} | {strings.long}
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

const ARROW_SIZE = 15
const POPOVER_PADDING = '10px'
const FIELD_FONT_SIZE = '16px'

const SpacePopover = ({
  children,
  space,
  setSpace,
}: { children?: ReactNode } & Props): JSX.Element => {
  if (!space) throw new Error('Unreachable')
  // const [showPopover, setShowPopover] = useState(false)
  const [showPopover, setShowPopover] = useState(true)
  const [localSpace, setLocalSpace] = useState(space)
  const hasChanges =
    localSpace.latitude !== space.latitude ||
    localSpace.longitude !== space.longitude

  // Always open with space in localSpace
  useEffect(() => setLocalSpace(space), [space])

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
                width: `${ARROW_SIZE}px`,
                height: `${ARROW_SIZE}px`,
                position: 'absolute',
                bottom: `-${ARROW_SIZE}px`,
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(45deg)',
                borderBottom: '1px solid #E8E8E8',
                borderRight: '1px solid #E8E8E8',
                background: '#FFF',
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <div style={{ padding: POPOVER_PADDING, flexGrow: 1 }}>
                {/* Lat/Long fields */}
                <div style={{ width: '200px', margin: '0 auto' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                    }}
                  >
                    <label htmlFor="latitude">Latitude</label>
                    &nbsp;
                    <input
                      id="latitude"
                      type="number"
                      value={localSpace.latitude}
                      onChange={(e) => {
                        const latitude = Number(e.target.value)
                        setLocalSpace((prev) => ({
                          latitude,
                          longitude: prev.longitude,
                        }))
                      }}
                      style={{
                        width: '14ch',
                        textAlign: 'right',
                        border: 'none',
                        padding: '2px',
                        color: 'rgba(0, 0, 0, 0.6)',
                        fontSize: FIELD_FONT_SIZE,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                    }}
                  >
                    <label htmlFor="longitude">Longitude</label>
                    &nbsp;
                    <input
                      id="longitude"
                      type="number"
                      value={localSpace.longitude}
                      onChange={(e) => {
                        const longitude = Number(e.target.value)
                        setLocalSpace((prev) => ({
                          latitude: prev.latitude,
                          longitude,
                        }))
                      }}
                      style={{
                        marginBottom: '2px',
                        width: '14ch',
                        textAlign: 'right',
                        border: 'none',
                        padding: '2px',
                        color: 'rgba(0, 0, 0, 0.6)',
                        fontSize: FIELD_FONT_SIZE,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  padding: POPOVER_PADDING,
                  height: '74px',
                  borderTop: '1px solid #E8E8E8',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {/* Save/Cancel */}
                <div style={{ textAlign: 'center' }}>
                  <button
                    style={{
                      border: '1px solid #E8E8E8',
                      borderRadius: '6px',
                      fontSize: '18px',
                      padding: ' 12px 24px',
                      background: 'transparent',
                      color: '#555',
                      cursor: hasChanges ? 'pointer' : 'not-allowed',
                      opacity: hasChanges ? 1 : 0.5,
                    }}
                    disabled={!hasChanges}
                    onClick={() => {
                      setSpace(localSpace.longitude, localSpace.latitude)
                      setShowPopover(false)
                    }}
                  >
                    Save
                  </button>
                  &nbsp; &nbsp;
                  <button
                    style={{
                      border: '1px solid #E8E8E8',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '18px',
                      padding: ' 12px 24px',
                      background: 'transparent',
                      color: '#555',
                    }}
                    onClick={() => {
                      setLocalSpace(space)
                      setShowPopover(false)
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
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
