import React, {
  ButtonHTMLAttributes,
  ReactNode,
  useMemo,
  useState,
} from 'react'
import { connect, Dispatch } from 'react-redux'

import { State, Space, ActionType } from '~singletons/interfaces'
import { getSpace } from '~singletons/space'
import { getDmsStrings } from '~util/dms'
import { Popover, PopoverTrigger, PopoverWrapper, usePopover } from './Popover'

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

const POPOVER_PADDING = '20px'
const FIELD_FONT_SIZE = '16px'

const SpacePopover = ({
  children,
  space,
  setSpace,
}: { children?: ReactNode } & Props): JSX.Element => {
  if (!space) throw new Error('Unreachable')

  const [localSpace, setLocalSpace] = useState(space)
  const hasChanges =
    localSpace.latitude !== space.latitude ||
    localSpace.longitude !== space.longitude

  const { isOpen, setOpen, setClose } = usePopover()

  return (
    <PopoverWrapper>
      <PopoverTrigger setOpen={setOpen}>{children}</PopoverTrigger>
      <Popover isOpen={isOpen} setClose={setClose}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <div>
            <button className="button">Button</button>
          </div>
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
                    padding: '2px',
                    textAlign: 'right',
                    border: 'none',
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
                    marginTop: '2px',
                    width: '14ch',
                    padding: '2px',
                    textAlign: 'right',
                    border: 'none',
                    color: 'rgba(0, 0, 0, 0.6)',
                    fontSize: FIELD_FONT_SIZE,
                  }}
                />
              </div>
            </div>
            {/* Detect current location */}
            <div style={{ margin: '12px 0 0', textAlign: 'center' }}>
              <CurrentLocationButton setLocalSpace={setLocalSpace} />
            </div>
            {/* Search for location */}
            <div style={{ margin: '12px 0 0', textAlign: 'center' }}>
              <SearchForLocation setLocalSpace={setLocalSpace} />
            </div>
          </div>
          {/* Popover Footer */}
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
              <FormButton
                isDisabled={!hasChanges}
                onClick={() => {
                  setSpace(localSpace.longitude, localSpace.latitude)
                  setClose()
                }}
              >
                Save
              </FormButton>
              &nbsp; &nbsp;
              <FormButton
                onClick={() => {
                  setLocalSpace(space)
                  setClose()
                }}
              >
                Cancel
              </FormButton>
            </div>
          </div>
        </div>
      </Popover>
    </PopoverWrapper>
  )
}

const FormButton = ({
  isDisabled = false,
  children,
  style,
  ...props
}: { isDisabled?: boolean } & ButtonHTMLAttributes<
  HTMLButtonElement
>): JSX.Element => (
  <button
    style={{
      border: '1px solid #E8E8E8',
      borderRadius: '6px',
      fontSize: '18px',
      padding: ' 12px 24px',
      background: 'transparent',
      color: '#555',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.5 : 1,
      ...style,
    }}
    disabled={isDisabled}
    {...props}
  >
    {children}
  </button>
)

const CurrentLocationButton = ({
  setLocalSpace,
}: {
  setLocalSpace: (s: Space) => void
}): JSX.Element => {
  const [loading, setLoading] = useState(false)
  return (
    <FormButton
      isDisabled={loading}
      style={{ position: 'relative' }}
      onClick={() => {
        setLoading(true)
        getSpace()
          .then((s) => setLocalSpace(s))
          .catch((e) => alert(e.message))
          .finally(() => setLoading(false))
      }}
    >
      {loading ? 'Getting Location...' : 'Use Current Location'} &nbsp; &nbsp;
      <span
        style={{
          position: 'absolute',
          top: 'calc(50% - 2px)', // weird glyph box
          right: '15px',
          transform: 'translateY(-50%)',
          fontSize: '24px',
        }}
      >
        ⌖
      </span>
    </FormButton>
  )
}

const SearchForLocation = ({
  setLocalSpace,
}: {
  setLocalSpace: (s: Space) => void
}): JSX.Element => {
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          placeholder="Search for location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
          style={{
            flexGrow: 1,
            fontSize: '16px',
            padding: ' 13px 16px',
            border: '1px solid #EEE',
            borderRadius: '6px',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
        />
        <FormButton
          isDisabled={loading}
          style={{
            position: 'relative',
            borderLeft: 'none',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          onClick={() => {
            setLoading(true)
          }}
        >
          &nbsp;
          <span
            style={{
              position: 'absolute',
              top: 'calc(50%)',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '24px',
            }}
          >
            {loading ? '⇄' : '⚲'}
          </span>
        </FormButton>
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
